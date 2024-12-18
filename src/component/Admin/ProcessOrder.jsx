import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateOrder,
  clearErrors,
  getOrderDetails,
} from "../../actions/orderAction";
import Sidebar from "./Siderbar";
import MetaData from "../Layouts/MetaData/MetaData";
import Loader from "../Layouts/loader/Loader";
import { toast } from 'react-toastify';
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";
import { Link, useParams } from "react-router-dom";

function ProcessOrder() {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.deleteUpdateOrder
  );

  const dispatch = useDispatch();
  // const alert = useAlert();
  const classes = {};
  const params = useParams();
  const productId = params.id;

  // for order status
  const [status, setStatus] = useState("");
  const [toggle, setToggle] = useState(false);

  // togle handler =>
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {

      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(productId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch,
    // alert,
    error, isUpdated, updateError, productId]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("status", status);
    dispatch(updateOrder(productId, myForm));
  };

  console.log(order)
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Process Order" />
          <div className=" flex" >
            <div
              className="flex"
            >
              <Sidebar />
            </div>

            <div className="bg-gray-100 p-8 w-full">
              <div className=" mx-auto bg-white shadow-lg rounded-lg p-6">
                <div>
                  <h5 className="text-2xl font-semibold mb-4">USER ORDER DETAILS</h5>
                  <div>OrderID: {order.ID}</div>

                  <div>Date: {order.createdAt}</div>
                  {order.orderItems &&
                    order.orderItems.map((item, idx) => (
                      <Link
                        to={`/product/${item.productId}`}
                        key={idx}
                        className="block mb-4 hover:bg-gray-100 p-4 rounded transition duration-300"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <div>
                          <img src={item.image} width={100} />
                          <div>{item.name}</div>
                          <div>{item.price}</div>
                          <div>X{item.quantity}</div>
                          <div>{item._id}</div>
                        </div>
                      </Link>
                    ))}
                </div>

                <div className="mt-8">
                  <div className="text-xl font-semibold mb-2">DELIVERY ADDRESS</div>
                  <div className="bg-gray-50 p-4 rounded shadow-sm">
                    <div className="font-medium text-lg">{order.user && order.user.name}</div>
                    <div className="mt-2">
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </div>
                    <div className="mt-2">{order.shippingInfo && order.shippingInfo.phoneNo}</div>
                    <div className="mt-2">{order.user && order.user.email}</div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-semibold">Total Price</h4>
                    <p className="text-gray-600">(Inclusive of all taxes)</p>
                  </div>
                  <p className="text-2xl font-bold mt-2">₹{order.totalPrice && order.totalPrice}</p>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-semibold">Order Status</h4>
                    <p className="text-lg font-bold">{order.orderStatus && order.orderStatus}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-semibold">Payment Status</h4>
                    <p className="text-lg font-bold">
                      {order.paymentInfo && order.paymentInfo.status}
                    </p>
                  </div>
                </div>

                {order.orderStatus && (
                  <>
                    <div className="mt-8 bg-gray-50 p-6 rounded shadow-sm">
                      <form>
                        <h1 className="text-2xl font-semibold mb-4">Process Order</h1>
                        <div className="mb-4">
                          <select
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                          >
                            <option value="">Choose Category</option>
                            {order.orderStatus === "Processing" && <option value="Shipped">Shipped</option>}
                            {order.orderStatus === "Shipped" && <option value="Delivered">Delivered</option>}
                          </select>
                        </div>
                        <button
                          onClick={updateOrderSubmitHandler}
                          disabled={loading || status === ""}
                          className={`w-full py-2 rounded text-white ${loading || status === "" ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 transition duration-300'}`}
                        >
                          Process
                        </button>
                      </form>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </>
      )}
    </>
  );
}

export default ProcessOrder;
