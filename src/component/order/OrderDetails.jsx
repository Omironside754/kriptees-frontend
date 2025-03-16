import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors, trackOrder } from "../../actions/orderAction";
import MetaData from "../Layouts/MetaData/MetaData";
import CricketBallLoader from "../Layouts/loader/Loader";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addItemToCart } from "../../actions/cartAction";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { trackingDetails, loading: trackingLoading, error: trackingError } =
    useSelector((state) => state.orderTrack);
  const { user, isAuthenticated } = useSelector((state) => state.userData);

  useEffect(() => {
    if (trackingError) {
      toast.error(trackingError);
      dispatch(clearErrors());
    }
    dispatch(trackOrder(id));
  }, [dispatch, id, trackingError]);

  // Custom hook to detect mobile view (screen width less than 768px)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <MetaData title="Order Details" />
      {trackingLoading ? (
        <CricketBallLoader />
      ) : (
        <div className="container mx-auto mt-16 px-4 py-8 font-[Poppins] text-gray-800">
          {/* Page Heading */}

          {trackingDetails && trackingDetails.orderDetails ? (
            <div className="max-w-6xl mx-auto">
              {/* Order Summary Box */}
              <div className="border border-gray-300 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold uppercase tracking-wide mb-4">
                  Order Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-semibold uppercase">Order ID:</span>{" "}
                      <span className="hidden md:inline">{trackingDetails.orderDetails.ID}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold uppercase">Order Date:</span>{" "}
                      {new Date(trackingDetails.orderDetails.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold uppercase">Order Total:</span>{" "}
                      <span className="hidden md:inline">₹{trackingDetails.orderDetails.totalPrice}</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-semibold uppercase">Payment Info:</span>{" "}
                      {trackingDetails.orderDetails.paymentInfo.id}
                    </p>
                    <p className="text-sm font-semibold uppercase">Shipping Address:</p>
                    <p className="text-sm">
                      {trackingDetails.orderDetails.shippingInfo.firstName}{" "}
                      {trackingDetails.orderDetails.shippingInfo.lastName}
                    </p>
                    <p className="text-sm">
                      {trackingDetails.orderDetails.shippingInfo.address}
                    </p>
                    <p className="text-sm">
                      {trackingDetails.orderDetails.shippingInfo.city},{" "}
                      {trackingDetails.orderDetails.shippingInfo.state} -{" "}
                      {trackingDetails.orderDetails.shippingInfo.pinCode}
                    </p>
                    <p className="text-sm">
                      {trackingDetails.orderDetails.shippingInfo.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items Box */}
              <div className="border border-gray-300 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold uppercase tracking-wide mb-4">
                  Order Items
                </h2>
                {trackingDetails.orderDetails.orderItems.map((product) => (
                  <div
                    key={product.productId}
                    className="flex flex-row items-start gap-4 mb-6 border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                    onClick={isMobile ? () => navigate(`/product/${product.productId}`) : undefined}
                  >
                    <Link to={`/product/${product.productId}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded border border-gray-300"
                      />
                    </Link>
                    <div className="flex-1 space-y-1">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {product.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: ₹{product.price}
                      </p>
                      <p className="text-sm text-gray-600">Seller: Kriptees</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Info Box */}
              <div className="border border-gray-300 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold uppercase tracking-wide mb-4">
                  Delivery Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-semibold uppercase">Delivery Status:</span>{" "}
                      {trackingDetails.orderDetails.orderStatus}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold uppercase">Delivery Date:</span>{" "}
                      7 Jan 2025
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold uppercase">
                      Tracking Information:
                    </p>
                    {trackingDetails.message ? (
                      <p className="text-sm">{trackingDetails.message}</p>
                    ) : trackingDetails.tracking_data &&
                      trackingDetails.tracking_data.shipment_track &&
                      trackingDetails.tracking_data.shipment_track[0] ? (
                      <>
                        <p className="text-sm">
                          <span className="font-semibold">Status:</span>{" "}
                          {trackingDetails.tracking_data.shipment_track[0].current_status}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Estimated Delivery:</span>{" "}
                          {trackingDetails.tracking_data.shipment_track[0].expected_date}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Last Location:</span>{" "}
                          {trackingDetails.tracking_data.shipment_track[0].current_location}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm">
                        No tracking information available at this time. Please check back later.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <button className="border border-black text-black px-4 py-2 uppercase text-sm font-medium hover:bg-black hover:text-white transition-colors">
                  Download Invoice
                </button>
                <button className="border border-black text-black px-4 py-2 uppercase text-sm font-medium hover:bg-black hover:text-white transition-colors">
                  Buy Again
                </button>
                <button className="border border-black text-black px-4 py-2 uppercase text-sm font-medium hover:bg-black hover:text-white transition-colors">
                  Track Package
                </button>
                <button className="border border-black text-black px-4 py-2 uppercase text-sm font-medium hover:bg-black hover:text-white transition-colors">
                  Return Items
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No order details available.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default OrderDetails;
