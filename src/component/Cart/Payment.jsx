import React, { useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder } from "../../actions/orderAction";

function PaymentComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPayButton, setShowPayButton] = useState(false);

  // Redux data
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  // Calculate subtotal
  const subTotal = cartItems.reduce(
    (acc, currItem) => acc + currItem.quantity * currItem.price,
    0
  );

  // For demonstration, we’re calling it “deliveryCharges” = 90
  const deliveryCharges = 90;
  const grandTotal = subTotal + deliveryCharges;

  // (Optional) For generating a unique order ID
  let orderCounter = 0;
  function generateOrderId() {
    const currentDate = new Date();
    const orderDateTimeSeconds = Math.floor(currentDate.getTime() / 1000);
    orderCounter = (orderCounter + 1) % 1000; // Increment counter, reset after 999
    return `order_${orderDateTimeSeconds}_${orderCounter}`;
  }

  // Create order in DB
  const createOrderInDatabase = async (order) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    try {
      await axios.post(`https://kriptees-backend-ays7.onrender.com/api/v1/order/new`, order, config);
      console.log("Order created in database");
    } catch (error) {
      console.error("Error creating order in database:", error);
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

  // For COD orders
  const handleSubmit = async () => {
    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: subTotal,
      shippingPrice: deliveryCharges,
      totalPrice: grandTotal,
    };

    order.ID = generateOrderId();
    order.paymentInfo = {
      id: "Cash On Delivery",
      status: "COD",
    };

    try {
      await createOrderInDatabase(order);
      dispatch(createOrder(order));
      toast.success("Order Confirmed!");
      navigate(`/success?orderId=${encodeURIComponent(order.ID)}`, {
        state: {
          orderId: order.ID,
          paymentMethod: paymentMethod,
        },
      });
    } catch (error) {
      console.error("Error creating COD order:", error);
      toast.error("Failed to create order!");
    }
  };

  // For Online Payment
  const doPayment = async () => {
    let cashfree;
    const initializeSDK = async () => {
      cashfree = await load({ mode: "production" });
    };
    await initializeSDK();

    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: subTotal,
      shippingPrice: deliveryCharges,
      totalPrice: grandTotal,
      paymentInfo: { id: "pending", status: "pending" },
    };

    order.ID = generateOrderId();

    try {
      // Create order in database first
      await createOrderInDatabase(order);

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };

      const { data } = await axios.post(
        `https://kriptees-backend-ays7.onrender.com/api/v1/payment/createOrder`,
        {
          ...order,
          order_meta: {
            return_url: `https://kriptees.com/success?orderId=${encodeURIComponent(order.ID)}`,
            notify_url: "https://www.cashfree.com/devstudio/preview/pg/webhooks/24210234",
            payment_methods: "cc,dc,upi",
          },
        },
        config
      );

      console.log("Order created successfully:", data);

      let checkoutOptions = {
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
    <div className="mt-16 px-4">
      {/* Outer container to center content and add spacing */}
      <div className="max-w-6xl mx-auto rounded-lg p-10 shadow-sm">
        {/* Heading */}
        <h2
          className=" 
            font-black              /* or 'font-[900]' for a numeric weight */
            text-[48px]
            leading-[44px]
            uppercase
            py-5
          "
        >
          Order Summary
        </h2>
        {/* Product / Item Box */}
        <div className="border border-gray-300 rounded-lg p-4 mb-6 relative">
          {/* "EDIT" link at top-right */}
          <button
            onClick={() => navigate("/cart")} // or wherever you want to edit the cart
            className="absolute top-2 right-2 text-gray-600 hover:underline uppercase text-sm"
          >
            Edit
          </button>

          {/* Product details */}
          {cartItems[0] && (
            <div className="flex items-center gap-4">
              <img
                src={cartItems[0].image}
                alt={cartItems[0].name}
                className="w-20 h-24 object-cover border border-gray-200"
              />
              <div className="flex flex-col">
                <h3 className="font-bold uppercase text-xl mb-1">
                  {cartItems[0].name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">SIZE: {cartItems[0].size}</p>

                {/* Quantity */}
                <div className="flex items-center gap-2 text-sm">
                  <span>QUANTITY:</span>
                  <div className="border flex items-center">
                    <button className="px-2 py-1 border-r">-</button>
                    <span className="px-3 py-1">{cartItems[0].quantity}</span>
                    <button className="px-2 py-1 border-l">+</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Total Box */}
        <div className="border border-gray-300 rounded-lg p-4 mb-6">
          <h4 className="uppercase font-bold text-lg mb-4">Total</h4>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-500">Product Cost</span>
            <span className="text-gray-700 font-medium">Rs.{subTotal}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-500">Delivery Charges</span>
            <span className="text-gray-700 font-medium">Rs.{deliveryCharges}</span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-300 pt-2">
            <span className="uppercase font-bold">Grand-Total</span>
            <span className="font-bold">Rs.{grandTotal}</span>
          </div>
        </div>

        {/* Payments Box */}
        <div className="border border-gray-300 rounded-lg p-4 mb-6">
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
        <div className="flex items-center mb-6">
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
          >
            Proceed to Pay
          </button>
        )}
        {paymentMethod === "ONLINE" && showPayButton && (
          <button
            onClick={doPayment}
            className="w-full bg-black text-white py-3 uppercase font-bold tracking-wider hover:bg-gray-800"
          >
            Proceed to Pay
          </button>
        )}
        {/* 
          If you want the button always visible, you can unify the logic:
            - If COD => handleSubmit
            - Else => doPayment
          And hide showConfirmation/showPayButton.
        */}
      </div>
    </div>
  );
}

export default PaymentComponent;
