import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { createOrder } from "../../actions/orderAction";

function OrderSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
  
  const orderId = searchParams.get("orderId");
  const paymentMethod = localStorage.getItem("paymentMethod");
  
  console.log("Order ID received:", orderId);
  console.log("Payment Method:", paymentMethod);
  console.log("Location state:", location.state);

  const [paymentDetails, setPaymentDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderCreationInProgress, setOrderCreationInProgress] = useState(false);

  useEffect(() => {
    if (orderId && paymentMethod === "ONLINE") {
      fetchPaymentDetails(orderId);
    } else if (paymentMethod === "COD") {
      setLoading(false);
      setOrderCreated(true);
    } else {
      setError("No order ID or payment method found.");
      setLoading(false);
    }
  }, [orderId, paymentMethod]);

  const fetchPaymentDetails = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };

      const response = await axios.post(
        `${BASE_URL}/payment/check`,
        { orderId },
        config
      );

      if (response.data && response.data.length > 0) {
        setPaymentDetails(response.data);
        
        // Check if payment was successful
        const successfulPayment = response.data.find(payment => 
          payment.payment_status === "SUCCESS" || 
          payment.payment_status === "PAID"
        );

        if (successfulPayment) {
          console.log("Payment successful, creating order in database");
          await createOrderAfterPayment(successfulPayment);
        } else {
          setError("Payment not successful or still pending");
        }
      } else {
        setError("No payment details found.");
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
      setError("Failed to fetch payment details.");
    } finally {
      setLoading(false);
    }
  };

  // OrderSuccess.jsx

const createOrderAfterPayment = async (paymentInfo) => {
  // prevent re-entry in the same render
  if (orderCreationInProgress) return;
  setOrderCreationInProgress(true);

  try {
    // 1) Check persistent flag
    const already = localStorage.getItem(`orderCreated_${orderId}`);
    if (already) {
      console.log("Order already created; skipping.");
      setOrderCreated(true);
      return;
    }

    // 2) *Immediately* set the flag to avoid race
    localStorage.setItem(`orderCreated_${orderId}`, "true");

    // 3) Grab your temp order
    const temp = localStorage.getItem(`tempOrder_${orderId}`);
    if (!temp) throw new Error("Temporary order data not found");
    const orderData = JSON.parse(temp);

    // 4) Merge payment info
    orderData.paymentInfo = {
      id: paymentInfo.cf_payment_id || paymentInfo.payment_id,
      status: "SUCCESS",
      payment_method: paymentInfo.payment_method,
      payment_amount: paymentInfo.payment_amount,
    };

    // 5) Fire your create-order API
    await createOrderInDatabase(orderData);

    // 6) Clean up and finish
    localStorage.removeItem(`tempOrder_${orderId}`);
    setOrderCreated(true);
    toast.success("Order created successfully!");
  } catch (err) {
    console.error("Error creating order after payment:", err);
    setError("Failed to create order after payment verification.");
    // If something really failed before DB write, you might want to clear the flag:
    // localStorage.removeItem(`orderCreated_${orderId}`);
  } finally {
    setOrderCreationInProgress(false);
    setLoading(false);
  }
};


  // Create order in database
  const createOrderInDatabase = async (orderData) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const normalizedOrder = {
        ...orderData,
        orderItems: orderData.orderItems.map(item => ({
          ...item,
          product: item.productId || item.product,
          productId: item.productId || item.product,
        }))
      };

      console.log("=== CREATING ORDER IN DATABASE ===");
      console.log("Order ID:", orderData.ID);
      console.log("Normalized Order:", normalizedOrder);
      
      const response = await axios.post(
        `${BASE_URL}/order/new`,
        normalizedOrder,
        config
      );

      console.log("✅ Order created successfully in database:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error creating order in database:", error);
      if (error.response?.status === 409) {
        console.log("Order already exists - this is expected behavior");
        return null; // Don't throw error for duplicate orders
      }
      throw error;
    }
  };

  console.log("paymentDetails", paymentDetails);

  if (loading) {
    return (
      <div className="bg-white mt-16" style={{ fontFamily: "Montserrat", letterSpacing: "0.12rem" }}>
        <div className="bg-white p-6 mt-34 md:mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold">
              {paymentMethod === "ONLINE" ? "Verifying Payment..." : "Processing..."}
            </h3>
            <p className="text-gray-600 my-2">Please wait while we confirm your payment</p>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-white mt-16" style={{ fontFamily: "Montserrat", letterSpacing: "0.12rem" }}>
        <div className="bg-white p-6 mt-34 md:mx-auto">
          <svg viewBox="0 0 24 24" className="text-red-600 w-16 h-16 mx-auto my-6">
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0ZM17,13H7a1,1,0,0,1,0-2H17a1,1,0,0,1,0,2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-red-900 font-semibold">
              Order Failed
            </h3>
            <p className="text-red-600 my-2">{error}</p>
            <div className="py-10 text-center">
              <button
                onClick={() => navigate("/")}
                className="px-12 bg-black hover:bg-gray-500 text-white font-semibold py-3"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white mt-16" style={{ fontFamily: "Montserrat", letterSpacing: "0.12rem" }}>
      <div className="bg-white p-6 mt-34 md:mx-auto">
        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            {paymentMethod === "COD" ? "Order Confirmed!" : "Payment Done!"}
          </h3>
          <p className="text-gray-600 my-2">
            {paymentMethod === "COD"
              ? "Thank you for placing your order. Your order will be delivered soon."
              : "Thank you for completing your secure online payment."}
          </p>

          {paymentMethod === "ONLINE" && paymentDetails.length > 0 && (
            <div className="my-4">
              <p className="text-gray-600">Order ID: {paymentDetails[0].order_id}</p>
              <p className="text-gray-600">Payment Status: {paymentDetails[0].payment_status}</p>
              <p className="text-gray-600">Amount Paid: ₹{paymentDetails[0].payment_amount}</p>
            </div>
          )}

          {paymentMethod === "COD" && (
            <div className="my-4">
              <p className="text-gray-600">Order ID: {orderId}</p>
              <p className="text-gray-600">Payment Method: Cash on Delivery</p>
            </div>
          )}

          <p> Have a great day! </p>
          <div className="py-10 text-center">
            <button
              onClick={() => navigate("/orders")}
              className="px-12 bg-black hover:bg-gray-500 text-white font-semibold py-3"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
