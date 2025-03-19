import React from "react";
import { Link } from "react-router-dom";
import { displayMoney, generateDiscountedPrice } from "../DisplayMoney/DisplayMoney";

const ProductCard = ({ product }) => {
  // Handle case when product is undefined
  if (!product) {
    return (
      <div className="border border-gray-600 rounded-md p-2 md:p-4 w-full hover:shadow-lg">
        <div className="w-full aspect-square bg-gray-200 flex items-center justify-center rounded-md">
          <p className="text-gray-500 text-xs md:text-sm">Image not available</p>
        </div>
        <h2 className="mt-2 md:mt-3 text-gray-800 text-sm md:text-base tracking-widest line-clamp-1">
          Product Unavailable
        </h2>
        <div className="mt-1 flex items-center space-x-2">
          <span className="text-xs md:text-sm font-bold tracking-widest text-gray-900">
            ₹0.00
          </span>
        </div>
      </div>
    );
  }

  // Handle both data structures (wishlist items and regular products)
  const hasImagesArray = product.images && product.images.length;
  const hasSingleImage = product.image && typeof product.image === "string";

  // Get image URL based on available data structure
  const imageUrl = hasImagesArray
    ? product.images[0].url
    : hasSingleImage
    ? product.image
    : "";

  // Use productId if _id is not available
  const productId = product._id || product.productId;

  // Calculate discounted and old prices
  let discountPrice = generateDiscountedPrice(product.price);
  discountPrice = displayMoney(discountPrice);
  const oldPrice = displayMoney(product.price);

  return (
    <div className="border border-gray-300 md:border-gray-600 rounded-md p-2 md:p-4 w-full hover:shadow-lg">
      {/* Product Image */}
      <Link to={`/product/${productId}`}>
        {/* CHANGED aspect-square to aspect-[3/4] to make the card taller */}
        <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden rounded-md">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover object-[45%_35%]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <p className="text-gray-500 text-xs md:text-sm">
                Image not available
              </p>
            </div>
          )}
        </div>
      </Link>

      {/* Product Name */}
      <h2
        className="mt-2 md:mt-3 text-gray-800 text-sm md:text-base tracking-widest line-clamp-1"
        style={{ fontFamily: "Montserrat", letterSpacing: "0.2rem" }}
      >
        {product.name}
      </h2>


      {/* Pricing */}
      <div className="mt-1 flex items-center space-x-2">
        <span className="text-xs md:text-sm font-bold tracking-widest text-gray-900"
        style={{ fontFamily: "Montserrat", letterSpacing: "0.2rem" }}>
          {oldPrice}
        </span>
        <span className="text-xs md:text-sm text-red-500 tracking-widest line-through"
        style={{ fontFamily: "Montserrat", letterSpacing: "0.2rem" }}>
          {discountPrice}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
