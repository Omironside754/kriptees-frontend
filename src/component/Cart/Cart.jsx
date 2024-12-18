import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  // new code
  const [couponCode, setCouponCode] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  // new code end

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    } else {
      dispatch(addItemToCart(id, newQty));
    }
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }

    dispatch(addItemToCart(id, newQty));
  };

  // new code
  const handleApplyCoupon = () => {
    // handle apply coupon logic
    setIsValid(false);
  };

  const handleFocus = (event) => {
    setIsFocused(event.target.value !== "");
  };

  // new code end

  const deleteCartItems = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = async () => {
    navigate("/login?redirect=/shipping");
  };

  // claculte price after discount
  let totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  console.log(cartItems)
  return (
    <>
      <div className="font-[sans-serif] mt-36">
        <div className="grid lg:grid-cols-3">
          <div className="lg:col-span-2 p-10 bg-white overflow-x-auto">
            <div className="flex border-b pb-4">
              <h2 className="text-2xl font-extrabold text-[#333] flex-1">Shopping Cart</h2>
              <h3 className="text-xl font-extrabold text-[#333]">{cartItems.length} Items</h3>
            </div>
            <div>
              <table className="mt-6 w-full border-collapse divide-y">
                <thead className="whitespace-nowrap text-left">
                  <tr>
                    <th className="text-base text-[#333] p-4">Description</th>
                    <th className="text-base text-[#333] p-4">Size</th>
                    <th className="text-base text-[#333] p-4">Quantity</th>
                    <th className="text-base text-[#333] p-4">Price</th>
                  </tr>
                </thead>
                <tbody className="whitespace-nowrap divide-y">

                  {cartItems &&
                    cartItems.map((item) => (
                      <tr>
                        <td className="py-6 px-4">
                          <div className="flex items-center gap-6 w-max">
                            <div className="h-36 shrink-0">
                              <img src={item.image} className="w-full h-full object-contain" />
                            </div>
                            <div>
                              <p className="text-md font-bold text-[#333]">{item.name}</p>
                              <button
                                onClick={() => deleteCartItems(item.productId)}

                                type="button" className="mt-4 font-semibold text-red-400 text-sm">
                                Remove
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <div className="flex items-center  w-max">
                            <div>
                              <p className="text-md font-bold text-[#333]">{item.size}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <div className="flex divide-x border w-max">
                            {/* <button
                              // onClick={decreaseQuantity(item.productId, item.quantity)}
                              type="button" className="bg-gray-100 px-4 py-2 font-semibold">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current" viewBox="0 0 124 124">
                                <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                              </svg>
                            </button> */}
                            <button type="button" className="bg-transparent px-4 py-2 font-semibold text-[#333] text-md">
                              {item.quantity}
                            </button>
                            {/* <button
                              // onClick={increaseQuantity(item.productId, item.quantity, item.stock)}

                              type="button" className="bg-gray-800 text-white px-4 py-2 font-semibold">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current" viewBox="0 0 42 42">
                                <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                              </svg>
                            </button> */}
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <h4 className="text-md font-bold text-[#333]">₹{item.price}</h4>
                        </td>
                      </tr>

                    ))}
                </tbody>
              </table>
            </div>
          </div>
          {cartItems.length > 0 ?

            <div className="bg-gray-50 p-10">
              <h3 className="text-xl font-extrabold text-[#333] border-b pb-4">Order Summary</h3>
              <ul className="text-[#333] divide-y mt-6">
                <li className="flex flex-wrap gap-4 text-md py-4">Subtotal <span className="ml-auto font-bold">₹{totalPrice}</span></li>
                <li className="flex flex-wrap gap-4 text-md py-4">Shipping <span className="ml-auto font-bold">₹90.00</span></li>
                <li className="flex flex-wrap gap-4 text-md py-4 font-bold">Total <span className="ml-auto">₹{totalPrice + 90}</span></li>
              </ul>
              <button
                onClick={checkoutHandler}
                type="button" className="mt-6 text-md px-6 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded">Check
                out</button>
            </div>
            : <></>}

        </div>
      </div>

      {/* <div className="cartPage">
        <MetaData title="Your Cart" />
        <div className="cart_HeaderTop">
          <div className="headerLeft">
            <Typography variant="h5" component="h1" className="cartHeading">
              Shopping Cart
            </Typography>
            <Typography variant="body2" className="cartText3">
              TOTAL ({cartItems.length} item) <b>{final}</b>
            </Typography>
          </div>
          <Typography
            variant="body2"
            className="cartText2"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </Typography>
        </div>

        <div className="separator_cart2"></div>

        {cartItems.length === 0 ? (
          <div className="emptyCartContainer">
            <RemoveShoppingCartIcon className="cartIcon" />

            <Typography variant="h5" component="h1" className="cartHeading">
              Your Shopping Cart is Empty
            </Typography>
            <Typography variant="body" className="cartText">
              Nothin' to see here.
            </Typography>
            <Typography variant="body" className="cartText">
              Let's get shopping!
            </Typography>
            <Link to="/products">
              <Button className="shopNowButton">Shop Now</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="cart_content_wrapper">
              <div className="cart_left_container">
                {cartItems &&
                  cartItems.map((item) => (
                    <Link
                      to="#"
                      style={{ textDecoration: "none", color: "none" }}
                    >
                      <CartItem
                        key={item.productId}
                        item={item}
                        deleteCartItems={deleteCartItems}
                        decreaseQuantity={decreaseQuantity}
                        increaseQuantity={increaseQuantity}
                        length={cartItems.length}
                        id={item.productId}
                      />
                    </Link>
                  ))}
              </div>

              <div className="separator_cart3"></div>
              <div className="cart_right_container">
                <div className="order_summary">
                  <h4>
                    Order Summary &nbsp; ( {cartItems.length}{" "}
                    {cartItems.length > 1 ? "items" : "item"} )
                  </h4>
                  <div className="order_summary_details">
                    <div className="price order_Summary_Item">
                      <span>Original Price</span>
                      {/* ORIGINAL PRICE TOATAL */}
      {/* <p>{totalPrice}</p>
    </div >

                    <div className="discount order_Summary_Item">
                      <span>Discount</span>
                      <p>
                        <del>{totalDiscount}</del>
                      </p>
                    </div>

                    <div className="delivery order_Summary_Item">
                      <span>Delivery</span>
                      <p>
                        <b>Free</b>
                      </p>
                    </div>

                    <div className="separator_cart"></div>
                    <div className="total_price order_Summary_Item">
                      <div>
                        <h4>Total Price</h4>

                        <p
                          style={{
                            fontSize: "14px",
                            marginTop: "-10px",
                            color: "#414141",
                          }}
                        >
                          (Inclusive of all taxes)
                        </p>
                      </div>
                      <p>
                        <b>{final}</b>
                      </p>
                    </div>
                  </div >
                </div >

                <div className="separator"></div>

                <div className="coupon-box-wrapper">
                  <div
                    className={`coupon-box-content ${isFocused ? "focused" : ""
                      }`}
                  >
                    <TextField
                      label="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      onFocus={handleFocus}
                      onBlur={() => setIsFocused(false)}
                      error={!isValid}
                      helperText={!isValid && "Invalid coupon code"}
                      variant="outlined"
                      size="small"
                      style={{ width: "200px", marginRight: "1rem" }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      className="coupon-box-apply-btn"
                      onClick={handleApplyCoupon}
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                <Button
                  variant="contained"
                  className="btn-custom"
                  onClick={checkoutHandler}
                >
                  Checkout
                </Button>

                <div className="paymentLogoImg">
                  <img
                    src={require("../../Image/cart/cart_img.png")}
                    alt="payemnt-icons"
                    className="paymentImg"
                  />
                </div>
              </div >
            </div >
          </>
        )}
      </div > * /} */}
    </>
  );
};

export default Cart;
