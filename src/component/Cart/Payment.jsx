import React, { useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder } from "../../actions/orderAction";

function PaymentComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPayButton, setShowPayButton] = useState(false);

  // Redux data
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  // Format quickBuy item if available
  let orderItems = [];
  if (location.state?.quickBuy) {
    // Create a properly formatted quickBuy item with consistent field names
    const quickBuyItem = {
      productId: location.state.quickBuy.product || location.state.quickBuy.id, // Use product or id
      name: location.state.quickBuy.name,
      price: location.state.quickBuy.price,
      quantity: location.state.quickBuy.quantity || 1,
      image: location.state.quickBuy.image,
      size: location.state.quickBuy.size || "M",
      // Add any other fields that might be required by your backend
    };
    orderItems = [quickBuyItem];
    console.log("Using formatted quickBuy item:", quickBuyItem);
  } else {
    orderItems = cartItems;
    console.log("Using cart items:", cartItems);
  }

  // Calculate subtotal based on orderItems.
  const subTotal = orderItems.reduce(
    (acc, currItem) => acc + currItem.quantity * currItem.price,
    0
  );
  
  // Delivery charges
  const deliveryCharges = 90;
  const grandTotal = subTotal + deliveryCharges;

  // Unique order ID generator
  let orderCounter = 0;
  function generateOrderId() {
    const currentDate = new Date();
    const orderDateTimeSeconds = Math.floor(currentDate.getTime() / 1000);
    orderCounter = (orderCounter + 1) % 1000;
    return `order_${orderDateTimeSeconds}_${orderCounter}`;
  }

  // Create order in the DB
  const createOrderInDatabase = async (order) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    try {
      // Try to normalize the order structure between quickBuy and cart items
      const normalizedOrder = {
        ...order,
        orderItems: order.orderItems.map(item => ({
          ...item,
          product: item.productId || item.product, // Ensure product field is present
          productId: item.productId || item.product, // Ensure productId field is present
        }))
      };
      
      console.log("Sending normalized order to database:", JSON.stringify(normalizedOrder));
      await axios.post(`https://kriptees-backend-ays7.onrender.com/api/v1/order/new`, normalizedOrder, config);
      console.log("Order created in database");
    } catch (error) {
      console.error("Error creating order in database:", error);
      if (error.response) {
        console.error("Server response data:", error.response.data);
        console.error("Server response status:", error.response.status);
      }
      throw error;
    }
  };

  // Handle payment method selection
  const handleSelectionChange = (e) => {
    const selectedPaymentMethod = e.target.value;
    setPaymentMethod(selectedPaymentMethod);
    localStorage.setItem("paymentMethod", selectedPaymentMethod);

    if (selectedPaymentMethod === "COD") {
      setShowConfirmation(true);
      setShowPayButton(false);
    } else {
      setShowConfirmation(false);
      setShowPayButton(true);
    }
  };

  // COD orders
  const handleSubmit = async () => {
    try {
      const orderId = generateOrderId();
      
      const order = {
        shippingInfo,
        orderItems,
        itemsPrice: subTotal,
        shippingPrice: deliveryCharges,
        totalPrice: grandTotal,
        paymentInfo: {
          id: "Cash On Delivery",
          status: "COD",
        },
        ID: orderId
      };

      console.log("Final order data for COD:", order);
      await createOrderInDatabase(order);
      dispatch(createOrder(order));
      toast.success("Order Confirmed!");
      navigate(`/success?orderId=${encodeURIComponent(orderId)}`, {
        state: {
          orderId: orderId,
          paymentMethod: paymentMethod,
        },
      });
    } catch (error) {
      console.error("Error creating COD order:", error);
      toast.error("Failed to create order!");
    }
  };

  // Online Payment
  const doPayment = async () => {
    let cashfree;
    const initializeSDK = async () => {
      cashfree = await load({ mode: "production" });
    };
    await initializeSDK();

    try {
      const orderId = generateOrderId();
      
      const order = {
        shippingInfo,
        orderItems,
        itemsPrice: subTotal,
        shippingPrice: deliveryCharges,
        totalPrice: grandTotal,
        paymentInfo: { 
          id: "pending", 
          status: "pending" 
        },
        ID: orderId
      };

      // Create order in DB first
      console.log("Final order data for online payment:", order);
      await createOrderInDatabase(order);

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await axios.post(
        `https://kriptees-backend-ays7.onrender.com/api/v1/payment/createOrder`,
        {
          ...order,
          order_meta: {
            return_url: `https://kriptees.com//success?orderId=${encodeURIComponent(orderId)}`,
            notify_url: "https://www.cashfree.com/devstudio/preview/pg/webhooks/24210234",
            payment_methods: "cc,dc,upi",
          },
        },
        config
      );

      console.log("Order created successfully:", data);

      const checkoutOptions = {
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_self",
      };

      console.log("Starting Cashfree checkout...");
      await cashfree.checkout(checkoutOptions).then(async (result) => {
        console.log("Cashfree checkout result:", result);

        if (result.error) {
          console.log("Payment failed:", result.error);
          toast.error("Payment Failed!");
          return;
        }
      });
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment process failed");
    }
  };

  return (
    <div className="mt-8 md:mt-12 px-4">
      <div className="max-w-6xl mx-auto rounded-lg p-8 shadow-sm bg-white">
        <h2 className="font-black text-3xl md:text-[44px] leading-[30px] md:leading-[40px] uppercase py-5 text-center md:text-left">
          Order Summary
        </h2>

        {/* Product / Item Box */}
        <div className="border border-gray-300 rounded-lg p-4 mb-6 relative"
        style={{ fontFamily: "Montserrat", letterSpacing: "0.1rem" }}>
          <button
            onClick={() => navigate("/cart")}
            className="absolute top-2 right-2 text-gray-600 hover:underline uppercase text-sm"
          >
            Edit
          </button>

          {/* Map over all items */}
          {orderItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-24 object-cover border border-gray-200"
              />
              <div className="flex flex-col">
                <h3 className="font-bold uppercase text-xl mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  SIZE: {item.size}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span>QUANTITY:</span>
                  <div className="border flex items-center">
                    <button className="px-2 py-1 border-r">-</button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button className="px-2 py-1 border-l">+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Box */}
        <div className="border border-gray-300 rounded-lg p-4 mb-6"
        style={{ fontFamily: "Montserrat", letterSpacing: "0.1rem" }}>
          <h4 className="uppercase font-bold text-lg mb-4">Total</h4>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-500">Product Cost</span>
            <span className="text-gray-700 font-medium">Rs.{subTotal}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-500">Delivery Charges</span>
            <span className="text-gray-700 font-medium">
              Rs.{deliveryCharges}
            </span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-300 pt-2">
            <span className="uppercase font-bold">Grand-Total</span>
            <span className="font-bold">Rs.{grandTotal}</span>
          </div>
        </div>

        {/* Payments Box */}
        <div className="border border-gray-300 rounded-lg p-4 mb-6"
        style={{ fontFamily: "Montserrat", letterSpacing: "0.1rem" }}>
          <h4 className="uppercase font-bold text-lg mb-4">Payments</h4>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              name="paymentMethod"
              value="ONLINE"
              checked={paymentMethod === "ONLINE"}
              onChange={handleSelectionChange}
              className="form-radio text-black"
            />
            <span className="ml-2 uppercase">Online Payment/UPI</span>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={handleSelectionChange}
              className="form-radio text-black"
            />
            <span className="ml-2 uppercase">Cash On Delivery</span>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center mb-6"
        style={{ fontFamily: "Montserrat", letterSpacing: "0.1rem" }}>
          <input
            required
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-2 focus:ring-black"
          />
          <label className="ml-2 text-sm text-gray-700 uppercase">
            I agree with the terms and conditions of kriptees
          </label>
        </div>

        {/* Final Button (Proceed to Pay / Place Order) */}
        {paymentMethod === "COD" && showConfirmation && (
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-3 uppercase font-bold tracking-wider hover:bg-gray-800"
            style={{ fontFamily: "Montserrat", letterSpacing: "0.1rem" }}
          >
            Place Your Order
          </button>
        )}
        {paymentMethod === "ONLINE" && showPayButton && (
          <button
            onClick={doPayment}
            className="w-full bg-black text-white py-3 uppercase font-bold tracking-wider hover:bg-gray-800"
            style={{ fontFamily: "Montserrat", letterSpacing: "0.1rem" }}
          >
            Proceed to Pay
          </button>
        )}
      </div>
    </div>
  );
}

export default PaymentComponent;