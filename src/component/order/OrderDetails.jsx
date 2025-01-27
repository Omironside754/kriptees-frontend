import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { clearErrors, trackOrder } from "../../actions/orderAction";
import MetaData from "../Layouts/MetaData/MetaData";
import CricketBallLoader from "../Layouts/loader/Loader";
import { toast } from 'react-toastify';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { trackingDetails, loading: trackingLoading, error: trackingError } = useSelector((state) => state.orderTrack);
  console.log("trackingDetails", trackingDetails);

  useEffect(() => {
    if (trackingError) {
      toast.error(trackingError);
      dispatch(clearErrors());
    }

    dispatch(trackOrder(id));
  }, [dispatch, id, trackingError]);

  return (
    <>
      <MetaData title="Order Details" />
      {trackingLoading ? (
        <CricketBallLoader />
      ) : (
        <div className="container mx-auto px-4 py-8 mt-24">
        <h1 className="text-2xl font-bold mb-6">Order Details</h1>
        {trackingDetails && trackingDetails.orderDetails ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            {/* Order Summary */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Order ID:</strong> {trackingDetails.orderDetails.ID}</p>
                  <p><strong>Order Date:</strong> {new Date(trackingDetails.orderDetails.createdAt).toLocaleDateString()}</p>
                  <p><strong>Order Total:</strong> ₹{trackingDetails.orderDetails.totalPrice}</p>
                </div>
                <div>
                  <p><strong>Payment Info:</strong> {trackingDetails.orderDetails.paymentInfo.id}</p>
                  <p><strong>Shipping Address:</strong></p>
                  <p>{trackingDetails.orderDetails.shippingInfo.firstName} {trackingDetails.orderDetails.shippingInfo.lastName}</p>
                  <p>{trackingDetails.orderDetails.shippingInfo.address}</p>
                  <p>{trackingDetails.orderDetails.shippingInfo.city}, {trackingDetails.orderDetails.shippingInfo.state} - {trackingDetails.orderDetails.shippingInfo.pinCode}</p>
                  <p>{trackingDetails.orderDetails.shippingInfo.country}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              {trackingDetails.orderDetails.orderItems.map((product) => (
                <div key={product.productId} className="flex flex-col md:flex-row items-start gap-4 mb-6 border-b pb-6">
                  <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                    <p className="text-sm text-gray-600">Price: ₹{product.price}</p>
                    <p className="text-sm text-gray-600">Seller: Kriptees</p>
                    <p className="text-sm text-gray-600">Return Eligible: Yes (Until 17 Jan 2025)</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Delivery Status:</strong> {trackingDetails.orderDetails.orderStatus}</p>
                  <p><strong>Delivery Date:</strong> 7 Jan 2025</p>
                </div>
                <div>
                  <p><strong>Tracking Information:</strong></p>
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
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                Download Invoice
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                Buy Again
              </button>
              <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">
                Track Package
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                Return Items
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">No order details available.</p>
        )}
      </div>
      )}
    </>
  );
};

export default OrderDetails;