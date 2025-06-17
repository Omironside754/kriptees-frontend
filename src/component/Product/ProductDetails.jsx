import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails} from "../../actions/productAction";
import { addItemToCart } from "../../actions/cartAction";
import { addItemToWishlist, removeItemFromWishlist } from "../../actions/wishlistAction";
import { PRODUCT_DETAILS_RESET } from "../../constants/productsConstants";
import MetaData from "../Layouts/MetaData/MetaData";
import CricketBallLoader from "../Layouts/loader/Loader";
import ProductCard from "../Home/ProductCard";
import { toast } from "react-toastify";

const displayMoney = (num) => {
  const numFormat = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  const arr = numFormat.format(num).split(".", 1);
  return arr[0];
};

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [i, setI] = useState(0);
  const [previewImg, setPreviewImg] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("S");
  const [touchStartX, setTouchStartX] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { product, loading, error, success } = useSelector((state) => state.productDetails);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { products: allProducts } = useSelector((state) => state.products);

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

  useEffect(() => {
    if (!product || !allProducts?.length) return;

    const nameWords = product.name?.toLowerCase().split(" ") || [];

    const nameMatches = allProducts.filter(
      (p) =>
        p._id !== product._id &&
        nameWords.some((word) => p.name?.toLowerCase().includes(word))
    );

    const tagMatches = allProducts.filter(
      (p) =>
        p._id !== product._id &&
        p.tags?.some((tag) => product.tags?.includes(tag))
    );

    const categoryMatches = allProducts.filter(
      (p) => p._id !== product._id && p.category === product.category
    );

    const allMatches = [...nameMatches, ...tagMatches, ...categoryMatches];
    const seen = new Set();
    const unique = [];

    for (const item of allMatches) {
      if (!seen.has(item._id)) {
        seen.add(item._id);
        unique.push(item);
      }
    }

    setRelatedProducts(unique.slice(0, 12));
  }, [allProducts, product]);

  const handlePreviewImg = (index) => {
    setPreviewImg(product.images[index].url);
    setI(index);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX;
    if (diffX > 50 && i > 0) {
      setI(i - 1);
      setPreviewImg(product.images[i - 1].url);
    } else if (diffX < -50 && i < product.images.length - 1) {
      setI(i + 1);
      setPreviewImg(product.images[i + 1].url);
    }
    setTouchStartX(null);
  };

  const increaseQuantityHandler = () => {
    if (product.Stock && quantity >= product.Stock) return;
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantityHandler = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddItem = () => {
    dispatch(addItemToCart(id, quantity, size));
    toast.success("Item Added To Cart");
  };

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeItemFromWishlist(id));
      toast.success("Removed from Wishlist");
    } else {
      dispatch(addItemToWishlist(id));
      toast.success("Added to Wishlist");
    }
  };

 const checkoutHandler = () => {
    const finalPrice = product.discount > 0 ? product.price - (product.price * product.discount / 100) : product.price;
    navigate("/shipping", {
      state: {
        quickBuy: {
          id,
          quantity,
          size,
          name: product.name,
          price: finalPrice,
          image: product.images?.[0]?.url || "",
        },
      },
    });
  };

  const getOldPrice = () => {
    if (!product.discount || product.discount === 0) return null;
    const original = product.price / (1 - product.discount / 100);
    return displayMoney(original);
  };

  const convertToPoints = (text) =>
    text?.split(". ").filter(Boolean).map((s) => s.trim());

  return loading ? (
    <CricketBallLoader />
  ) : (
    <>
      <MetaData title={product.name || "Product Details"} />
      <div className="bg-white pt-28 md:pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="flex flex-col-reverse md:flex-row gap-4">
                <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-hidden md:w-1/5">
                  {product.images?.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      loading="lazy"
                      onClick={() => handlePreviewImg(index)}
                      className={`w-20 h-24 object-cover rounded cursor-pointer ${index === i ? "ring-2 ring-black" : ""
                        }`}
                      alt={`thumb-${index}`}
                    />
                  ))}
                </div>
                <div className="md:w-4/5">
                  <div className="group relative w-full">
                    <img
                      src={previewImg}
                      alt="Main"
                      className="w-full object-cover aspect-[3/4] rounded group-hover:scale-105 transition-transform duration-200"
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 md:pl-8">
              <h2 className="text-2xl font-bold uppercase tracking-wide">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{product.info}</p>

              <div className="mb-2 flex items-center space-x-3">
                <span className="text-xl font-bold text-black">
                  {product.discount > 0
                    ? displayMoney(product.price - (product.price * product.discount / 100))
                    : displayMoney(product.price)}
                </span>
                {product.discount > 0 && (
                  <span className="text-gray-500 line-through text-sm">
                    {displayMoney(product.price)}
                  </span>
                )}
              </div>


              <div className="text-sm mb-2">
                {product.Stock > 10 ? (
                  <span className="text-green-600">In Stock</span>
                ) : product.Stock > 0 ? (
                  <span className="text-yellow-600">Only {product.Stock} left</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>

              <div className="mb-4">
                <h3 className="font-bold uppercase text-sm">Size</h3>
                <div className="flex gap-2 mt-1">
                  {["S", "M", "L", "XL"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-4 py-2 border ${size === s ? "bg-black text-white" : "bg-white text-black"
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <button onClick={decreaseQuantityHandler} className="w-8 h-8 border">-</button>
                <span>{quantity}</span>
                <button onClick={increaseQuantityHandler} className="w-8 h-8 border">+</button>
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
              <button onClick={checkoutHandler} className="bg-black text-white w-full py-3">Buy Now</button>

              <div className="mt-6 border-t pt-6">
                <h3 className="font-semibold mb-2">About Your Choice</h3>
                {convertToPoints(product.description)?.map((pt, i) => (
                  <p key={i} className="text-sm">- {pt}</p>
                )) || <p>No description available.</p>}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4">You may also like</h3>
              <div className="flex gap-4 overflow-x-auto">
                {relatedProducts.map((item) => (
                  <div key={item._id} className="w-52 flex-shrink-0">
                    <ProductCard product={item} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
