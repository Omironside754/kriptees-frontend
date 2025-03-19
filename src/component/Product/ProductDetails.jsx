import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReviewCard from "./ReviewCard";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import MetaData from "../Layouts/MetaData/MetaData";
import { addItemToCart } from "../../actions/cartAction";
import CricketBallLoader from "../Layouts/loader/Loader";
import { PRODUCT_DETAILS_RESET } from "../../constants/productsConstants";
import { toast } from "react-toastify";
import { addItemToWishlist } from "../../actions/wishlistAction";
import { removeItemFromWishlist } from "../../actions/wishlistAction";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Track which thumbnail is active
  const [i, setI] = useState(0);
  // Track main preview image
  const [previewImg, setPreviewImg] = useState("");
  // Product quantity and size
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("S");

  // For detecting swipe gestures
  const [touchStartX, setTouchStartX] = useState(null);

  // Redux states
  const { product, loading, error, success } = useSelector(
    (state) => state.productDetails
  );

  // Get wishlist items from Redux store
  const { wishlistItems } = useSelector((state) => state.wishlist);

  // Check if the product is already in the wishlist
  const isInWishlist = wishlistItems?.some((item) => item.productId === id);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      dispatch({ type: PRODUCT_DETAILS_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, success]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setPreviewImg(product.images[0].url);
      setI(0);
    }
  }, [product]);

  // Handle thumbnail click
  const handlePreviewImg = (index) => {
    setPreviewImg(product.images[index].url);
    setI(index);
  };

  // ===== SWIPE HANDLERS =====
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX;

    // Swipe right => previous
    if (diffX > 50 && i > 0) {
      const newIndex = i - 1;
      setI(newIndex);
      setPreviewImg(product.images[newIndex].url);
    }
    // Swipe left => next
    else if (diffX < -50 && i < product.images.length - 1) {
      const newIndex = i + 1;
      setI(newIndex);
      setPreviewImg(product.images[newIndex].url);
    }
    setTouchStartX(null);
  };

  // Quantity
  const increaseQuantityHandler = () => {
    if (product.Stock && quantity >= product.Stock) return;
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantityHandler = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  // Add to Cart
  const handleAddItem = () => {
    dispatch(addItemToCart(id, quantity, size));
    toast.success("Item Added To Cart");
  };

  // Toggle Wishlist: add if not added, or remove if already added
  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeItemFromWishlist(id));
      toast.success("Item removed from Wishlist");
    } else {
      dispatch(addItemToWishlist(id));
      toast.success("Item Added To Wishlist");
    }
  };

  // Convert product description to bullet points
  const convertToPoints = (text) => {
    if (text && typeof text === "string") {
      return text
        .split(". ")
        .map((sentence) => sentence.trim())
        .filter((sentence) => sentence.length > 0);
    }
    return [];
  };

  const points = convertToPoints(product.description);

  // Quick buy
  const checkoutHandler = () => {
    navigate("/shipping", {
      state: {
        quickBuy: {
          id,
          quantity,
          size,
          name: product.name,
          price: product.price,
          image:
            product.images && product.images.length > 0
              ? product.images[0].url
              : "",
        },
      },
    });
  };

  return (
    <>
      {loading ? (
        <CricketBallLoader />
      ) : (
        <>
          <MetaData title={product.name || "Product Details"} />
          <div className="bg-white dark:bg-gray-800 py-10 mt-4 md:mt-10">
            <div className="max-w-7xl mx-auto px-4 py-4">
              {/* Two-column layout: left for images, right for details */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* LEFT COLUMN: Main image + thumbnails */}
                <div className="md:w-1/2">
                  <div className="flex flex-col-reverse md:flex-row gap-4">
                    {/* Thumbnails */}
                    <div className="flex md:flex-col gap-3 md:mt-0 md:w-1/5 p-1 overflow-x-auto md:overflow-x-hidden">
                      {product.images &&
                        product.images.map((img, index) => (
                          <div
                            key={index}
                            className={`cursor-pointer min-w-20 md:w-full rounded-lg ${
                              index === i
                                ? "ring-2 ring-black ring-offset-2 ring-offset-white"
                                : ""
                            }`}
                            onClick={() => handlePreviewImg(index)}
                          >
                            <img
                              src={img.url}
                              alt={`Product Preview ${index}`}
                              className="w-20 h-[6.8rem] md:w-full md:h-36 object-cover object-[45%_35%] rounded-lg"
                            />
                          </div>
                        ))}
                    </div>
                    {/* Main Image with swipe handlers on mobile */}
                    <div
                      className="md:w-4/5"
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                    >
                      <img
                        src={previewImg}
                        alt="Product Main"
                        className="w-full md:aspect-[3/4] object-cover object-[45%_35%] rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Product Info */}
                <div className="md:w-1/2 md:pl-8">
                  <div className="mb-2">
                    <h2 className="text-2xl font-bold uppercase tracking-wider">
                      {product.name || "KRIPTEES X JUJUTSU"}
                    </h2>
                    <p
                      className="text-gray-600 text-sm mb-2"
                      style={{ fontFamily: "Montserrat", letterSpacing: "0.1rem" }}
                    >
                      {product.info || "Black Anime Printed Oversized Shirt"}
                    </p>
                  </div>
                  <div className="mb-4">
                    <span className="text-xl font-bold">
                      Rs.{product.price || 799}
                    </span>
                    {product.oldPrice && (
                      <span className="text-gray-500 line-through ml-2">
                        Rs.{product.oldPrice}
                      </span>
                    )}
                  </div>
                  <div className="mb-6">
                    <h3 className="font-bold mb-2 uppercase text-sm">Size</h3>
                    <div className="flex space-x-2">
                      {["S", "M", "L", "XL"].map((option) => (
                        <button
                          key={option}
                          onClick={() => setSize(option)}
                          className={`w-12 h-12 flex items-center justify-center border ${
                            size === option
                              ? "bg-black text-white border-black"
                              : "bg-white text-black border-gray-300 hover:border-black"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div
                    className="mb-6"
                    style={{ fontFamily: "Montserrat", letterSpacing: "0.1rem" }}
                  >
                    <h3 className="font-bold mb-2 uppercase text-sm">
                      Quantity
                    </h3>
                    <div className="flex border border-gray-300 w-32">
                      <button
                        onClick={decreaseQuantityHandler}
                        className="w-10 h-10 flex items-center justify-center border-r"
                      >
                        -
                      </button>
                      <div className="flex-1 h-10 flex items-center justify-center">
                        {quantity}
                      </div>
                      <button
                        onClick={increaseQuantityHandler}
                        className="w-10 h-10 flex items-center justify-center border-l"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div
                    className="flex gap-4 mb-6"
                    style={{ fontFamily: "Montserrat", letterSpacing: "0.1rem" }}
                  >
                    <button
                      onClick={handleAddItem}
                      className="bg-white border border-gray-300 text-black py-3 uppercase tracking-wider hover:border-black w-full"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={toggleWishlist}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-black"
                    >
                      {isInWishlist ? (
                        <>
                          {/* Red Heart Icon */}
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="red"
                            stroke="red"
                            strokeWidth="1"
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                                    2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                                    C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                                    c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                          <span>WISHLISTED</span>
                        </>
                      ) : (
                        /* Only text, centered */
                        <span>WISHLIST</span>
                      )}
                    </button>

                  </div>
                  <button
                    onClick={checkoutHandler}
                    className="bg-black text-white py-3 uppercase tracking-wider w-full"
                    style={{ fontFamily: "Montserrat", letterSpacing: "0.1rem" }}
                  >
                    Buy Now
                  </button>
                  <div
                    className="border-t border-b py-6"
                    style={{ fontFamily: "Montserrat", letterSpacing: "0.1rem" }}
                  >
                    <h3 className="font-bold mb-4 uppercase text-lg">
                      About Your Choice
                    </h3>
                    {points.length > 0 ? (
                      <ul className="space-y-2">
                        {points.map((point, idx) => (
                          <li key={idx}>· {point}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600">
                        No description available.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
