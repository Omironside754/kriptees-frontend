import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { myOrders, clearErrors, trackOrder } from "../../actions/orderAction";
import MetaData from "../Layouts/MetaData/MetaData";
import CricketBallLoader from "../Layouts/loader/Loader";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../../actions/cartAction";

const MyOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading, error } = useSelector((state) => state.myOrder);
  const { user, isAuthenticated } = useSelector((state) => state.userData);
  const { trackingDetails, loading: trackingLoading, error: trackingError } = useSelector((state) => state.orderTrack);

  const [trackedOrderId, setTrackedOrderId] = useState(null);

  const addToCartHandler = (id, qty = 0) => {
    dispatch(addItemToCart(id, qty));
    toast.success("Item Added to Cart");
    navigate("/cart");
  };

  const trackOrderHandler = (orderId) => {
    dispatch(trackOrder(orderId));
    setTrackedOrderId(orderId);
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error, isAuthenticated, navigate]);

  useEffect(() => {
    if (trackingError) {
      toast.error(trackingError);
      dispatch(clearErrors());
    }
  }, [dispatch, trackingError]);

  //console.log("Orders:", orders); // Add this line for debugging

  return (
    <>
      <MetaData title="My Orders" />
      {loading ? (
        <CricketBallLoader />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">My Orders</h1>
          {orders && orders.length > 0 ? (
            orders.map((item) => (
              <section className="bg-white shadow-md rounded-lg p-6 mb-8" key={item._id}>
                <h2 className="text-xl font-semibold mb-4">Order ID: {item._id}</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Order Items</h3>
                    {item.orderItems.map((product) => (
                      <div className="flex items-center gap-4 mb-4" key={product.productId}>
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                          <p className="text-sm text-gray-600">Price: ₹{product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Order Details</h3>
                    <p><strong>Status:</strong> {item.orderStatus}</p>
                    <p><strong>Total Amount:</strong> ₹{item.totalPrice}</p>
                    <p><strong>Placed On:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
                    <button
                      onClick={() => trackOrderHandler(item._id)}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
                
                {/* Tracking Information */}
                {trackingDetails && trackedOrderId === item._id && (
                  <div className="mt-6 bg-gray-100 p-4 rounded">
                    <h3 className="text-lg font-medium mb-2">Tracking Information</h3>
                    {trackingDetails.message ? (
                      <p>{trackingDetails.message}</p>
                    ) : trackingDetails.tracking_data && trackingDetails.tracking_data.shipment_track && trackingDetails.tracking_data.shipment_track[0] ? (
                      <>
                        <p><strong>Status:</strong> {trackingDetails.tracking_data.shipment_track[0].current_status}</p>
                        <p><strong>Estimated Delivery:</strong> {trackingDetails.tracking_data.shipment_track[0].expected_date}</p>
                        <p><strong>Last Location:</strong> {trackingDetails.tracking_data.shipment_track[0].current_location}</p>
                      </>
                    ) : (
                      <p>No tracking information available at this time. Please check back later.</p>
                    )}
                  </div>
                )}
              </section>
            ))
          ) : (
            <p className="text-center text-gray-600">You haven't placed any orders yet.</p>
          )}
        </div>
      )}
    </>
  );
};

export default MyOrder;