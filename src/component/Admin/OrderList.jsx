import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, clearErrors, deleteOrder } from "../../actions/orderAction";
import { toast } from 'react-toastify';
// import { useHistory } from "react-router-dom";
import MetaData from "../Layouts/MetaData/MetaData";
import Loader from "../Layouts/loader/Loader";
import Sidebar from "./Siderbar";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";
function OrderList() {
  const dispatch = useDispatch();
  // const alert = useAlert();
  const navigate = useNavigate();

  const {
    error,
    loading,
    orders
  } = useSelector((state) => state.allOrders);


  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteUpdateOrder
  );

  const [toggle, setToggle] = useState(false);

  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  // to close the sidebar when the screen size is greater than 1000px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);


      }
    };


    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggle]);


  // dispatching the action
  useEffect(() => {
    if (error) {
      toast.error(error);
      console.log(error)
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError)
      dispatch(clearErrors())
    }
    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch,
    error,
    alert,
    isDeleted,
    navigate,
    deleteError
  ]);


  // delet order handler
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id))
  };




  const rows = [];
  orders && orders.forEach(item => {

    rows.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      amount: item.totalPrice,
      status: item.orderStatus,
    });
  })

  console.log(rows)


  return (
    <>
      {
        loading
          ? (
            <Loader />
          ) : (
            <>
              <MetaData title={`ALL Orders - Admin`} />
              <div className=" flex" >
                <div className="">
                  <Sidebar />
                </div>

                <div className=" bg-gray-200 w-full h-screen">
                  <div className=" ">
                    <h4 className=" flex  m-4 font-semibold text-xl">ALL ORDERS</h4>

                    <div class="relative overflow-x-auto m-16 rounded-lg shadow-lg">
                      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" class="px-6 py-3">
                              Order ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Item Quantity
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Amount
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Actions
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {rows.map((item) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.id}
                              </th>
                              <td class="px-6 py-4">
                                {item.status}

                              </td>
                              <td class="px-6 py-4">
                                {item.itemsQty}

                              </td>
                              <td class="px-6 py-4">
                                ₹{item.amount}
                              </td>
                              <td class="px-6 py-4">
                                <button className=" mx-1 px-1 bg-gray-200 rounded-md">
                                  <Link
                                    to={`/admin/order/${item.id}`}
                                  >
                                    Edit
                                  </Link>

                                </button>
                                <button
                                  onClick={() =>
                                    deleteOrderHandler(item.id)
                                  }
                                  className=" mx-1 px-1 bg-red-500 text-white rounded-md">

                                  Delete

                                </button>

                              </td>
                            </tr>

                          ))}

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
    </>
  );
}


export default OrderList;
