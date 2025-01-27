import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOrder } from "../../actions/orderAction";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function PaymentComponent() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPayButton, setShowPayButton] = useState(false);
  const dispatch = useDispatch();

  const { shippingInfo, cartItems} = useSelector((state) => state.cart);
  
  console.log("cartItems:", cartItems);

  const subTotal = cartItems.reduce((acc, currItem) => {
    console.log("acc:", acc, "currItem:", currItem);
    return acc + currItem.quantity * currItem.price;
  }, 0);

  const totalFinalPrice = subTotal;

  let orderCounter = 0;

function generateOrderId() {
    const currentDate = new Date();
    const orderDateTimeSeconds = Math.floor(currentDate.getTime() / 1000);
    orderCounter = (orderCounter + 1) % 1000; // Increment counter, reset after 999
    return `order_${orderDateTimeSeconds}_${orderCounter}`;
}

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

  const doPayment = async () => {
    let cashfree;
    var initializeSDK = async function () {
      cashfree = await load({
        mode: "production",
      });
    };
    await initializeSDK();

    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: subTotal,
      shippingPrice: 90,
      totalPrice: totalFinalPrice,
      paymentInfo: {
        id: "pending",
        status: "pending",
      },
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

        // if (result) {
        //   // Navigate to OrderSuccess page with orderId
        //   console.log("Order ID being passed:", data.order_id);
        //   navigate("/success", {
        //     state: {
        //       orderId: data.order_id,
        //     },
        //   });
        // }
      });
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment process failed");
    }
  };

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

  const handleSubmit = async () => {
    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: subTotal,
      shippingPrice: 90,
      totalPrice: totalFinalPrice,
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
          paymentMethod : paymentMethod,
        },
      });
    } catch (error) {
      console.error("Error creating COD order:", error);
      toast.error("Failed to create order!");
    }
  };

  return (
    <div className=" mt-16">
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Order summary
            </h2>

            <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Billing & Delivery information
              </h4>

              <dl>
                <dt className="text-base font-medium text-gray-900 dark:text-white">
                  {shippingInfo.firstName + " " + shippingInfo.lastName}
                </dt>

                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                  {shippingInfo.address +
                    ", " +
                    shippingInfo.city +
                    ", " +
                    shippingInfo.state +
                    ", " +
                    shippingInfo.country +
                    " " +
                    shippingInfo.pinCode}
                </dd>
                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                  {shippingInfo.email}
                </dd>
                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                  {shippingInfo.phoneNo}
                </dd>
              </dl>

              <button
                type="button"
                data-modal-target="billingInformationModal"
                data-modal-toggle="billingInformationModal"
                className="text-base font-medium text-primary-700 hover:underline dark:text-primary-500"
                onClick={() => {
                  navigate("/shipping");
                }}>
                Edit
              </button>
            </div>

            <div className="mt-6 sm:mt-8">
              <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Items in the package
                </h4>

                <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {cartItems &&
                      cartItems.map((items) => (
                        <tr>
                          <td className="whitespace-nowrap py-4 md:w-[384px]">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center aspect-square w-10 h-10 shrink-0">
                                <img
                                  className="h-auto w-full max-h-full dark:hidden"
                                  src={items.image}
                                  alt="imac image"
                                />
                                <img
                                  className="hidden h-auto w-full max-h-full dark:block"
                                  src={items.image}
                                  alt="imac image"
                                />
                              </div>
                              <Link to={"/"} className="hover:underline">
                                {items.name}
                              </Link>
                            </div>
                          </td>
                          <td className="p-4 text-base font-normal text-gray-900 dark:text-white">
                            {items.size}
                          </td>

                          <td className="p-4 text-base font-normal text-gray-900 dark:text-white">
                            {items.quantity}
                          </td>

                          <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">
                            ₹{items.price}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 space-y-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </h4>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500 dark:text-gray-400">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        {totalFinalPrice}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500 dark:text-gray-400">
                        Store Pickup
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ₹{90}
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-lg font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-lg font-bold text-gray-900 dark:text-white">
                      ₹{totalFinalPrice + 90}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Choose Payment Method
              </h4>

              <div>
                <label className="block text-gray-700">Payment Method:</label>
                <div className="mt-2 sm:flex-col">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-indigo-600"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={handleSelectionChange}
                    />
                    <span className="ml-2">Cash On Delivery</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      className="form-radio text-indigo-600"
                      name="paymentMethod"
                      value="ONLINE"
                      checked={paymentMethod === "ONLINE"}
                      onChange={handleSelectionChange}
                    />
                    <span className="lg:ml-2">Online Payment / UPI</span>
                  </label>
                </div>

                {showConfirmation && (
                  <div className="mt-4">
                    <div className="flex items-start sm:items-center">
                      <input
                        required
                        id="terms-checkbox-2"
                        type="checkbox"
                        value=""
                        className="h-4 w-4 mb-2 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                      />
                      <label
                        for="terms-checkbox-2"
                        className="ms-2 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {" "}
                        I agree with the{" "}
                        <a
                          href="#"
                          title=""
                          className="text-primary-700 underline hover:no-underline dark:text-primary-500">
                          Terms and Conditions
                        </a>{" "}
                        of use of the Kriptees
                      </label>
                    </div>
                    <div className="gap-4 sm:flex sm:items-center">
                      <button
                        type="button"
                        className="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                        Return to Shopping
                      </button>

                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0">
                        Place Order
                      </button>
                    </div>
                  </div>
                )}

                {showPayButton && (
                  <div className="mt-4">
                  <div className="flex items-start sm:items-center">
                  <input
                    required
                    id="terms-checkbox-2"
                    type="checkbox"
                    value=""
                    className="h-4 w-4 mb-2 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                  />
                  <label
                    for="terms-checkbox-2"
                    className="ms-2 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {" "}
                    I agree with the{" "}
                    <a
                      href="#"
                      title=""
                      className="text-primary-700 underline hover:no-underline dark:text-primary-500">
                      Terms and Conditions
                    </a>{" "}
                    of use of the Kriptees
                  </label>
                </div>
                  <div className="mt-4">
                    <button
                      onClick={doPayment}
                      className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0">
                      Pay Now
                    </button>
                  </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PaymentComponent;