import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";

const Cart = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [animationClass, setAnimationClass] = useState("translate-x-full");

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      // Small delay before starting animation for a smoother effect
      setTimeout(() => {
        setAnimationClass("translate-x-0");
      }, 50);
    } else {
      setAnimationClass("translate-x-full");
    }
  }, [isOpen]);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) return;
    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;
    dispatch(addItemToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    onClose(); // Close the cart first
    navigate("/login?redirect=/shipping");
  };

  const goBack = () => {
    onClose();
  };

  // Navigate to product detail
  const navigateToProduct = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  // Make background fixed when cart is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Don't render the drawer at all if cart isn't open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Semi-transparent overlay (click to close) */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30 p-4 transition-opacity duration-500"
        style={{ opacity: animationClass === "translate-x-0" ? 1 : 0 }}
        onClick={onClose}
      />

      {/* Cart Drawer */}
      <div
        className={`
          relative z-10
          transition-transform duration-1000 ease-in-out
          transform ${animationClass}
          h-full
          w-full sm:w-3/4 md:w-1/3
        `}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          boxShadow: "-4px 0 15px rgba(0,0,0,0.1)",
        }}
      >
        <div className="bg-gray-200 p-9 shadow-inner h-full overflow-y-auto">
          {/* Close Button (top-right) */}
          <button
            onClick={goBack}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-start mb-6 pb-6 border-b border-gray-200"
                >
                  <div
                    className="w-20 h-24 flex-shrink-0 mr-4 relative cursor-pointer"
                    onClick={() => navigateToProduct(item.productId)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent navigation on delete
                        deleteCartItems(item.productId);
                      }}
                      className="absolute top-0 left-0 text-red-500 bg-white rounded-full p-1"
                      style={{ fontSize: "16px", transform: "translate(-50%, -50%)" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-grow">
                    <h3
                      className="font-bold text-xl uppercase cursor-pointer hover:text-gray-700"
                      onClick={() => navigateToProduct(item.productId)}
                    >
                      {item.name}
                    </h3>
                    <p className="text-gray-600 mb-1">SIZE: {item.size}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <span className="mr-2">QUANTITY:</span>
                        <div className="border rounded inline-flex">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              decreaseQuantity(item.productId, item.quantity);
                            }}
                            className="px-2 py-1 border-r"
                          >
                            -
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              increaseQuantity(item.productId, item.quantity, item.stock);
                            }}
                            className="px-2 py-1 border-l"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className="font-bold">₹{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center my-4">
                <span className="font-bold">TOTAL</span>
                <span className="font-bold text-xl">₹{totalPrice}</span>
              </div>

              <button
                onClick={checkoutHandler}
                className="w-full bg-black text-white py-3 uppercase font-bold tracking-wider hover:bg-gray-800"
              >
                PROCEED TO CHECKOUT
              </button>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-xl font-semibold mb-4">Your cart is empty</p>
              <button
                onClick={() => {
                  onClose();
                  navigate("/");
                }}
                className="bg-black text-white px-6 py-2 rounded"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
