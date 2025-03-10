import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import MetaData from "../Layouts/MetaData/MetaData";
import ProductCard from "../Home/ProductCard";
import { removeItemFromWishlist, addItemToWishlist } from "../../actions/wishlistAction";

function Wishlist() {
  const dispatch = useDispatch();

  // Get wishlist data from Redux store
  const { wishlistItems } = useSelector((state) => state.wishlist);
  console.log("wishlistItems", wishlistItems);

  // Handle removing item from wishlist
  const handleRemoveFromWishlist = (id) => {
    dispatch(removeItemFromWishlist(id));
    toast.success("Item removed from Wishlist");
  };

  // Handle adding item to wishlist
  const handleAddToWishlist = (product) => {
    dispatch(addItemToWishlist(product._id));
    toast.success("Item added to Wishlist");
  };

  return (
    <>
      <MetaData title="Your Wishlist" />
      <div className="Home_Page mt-16 px-9 pt-10">
        {/* 1) Heading directly below the Kriptees logo */}

        {/* 2) Display Wishlist Products */}
        {wishlistItems.length > 0 ? (
          <div className="py-8 flex flex-wrap justify-start gap-8 max-w-full-xl mx-auto px-4">
            {wishlistItems.map((product) => (
              <div key={product.productId} className="relative">
                {/* Transform the wishlist item to match what ProductCard expects */}
                <ProductCard
                  product={{
                    ...product,
                    _id: product.productId, // Map productId to _id
                    images: product.image ? [{ url: product.image }] : [] // Convert image string to expected images array
                  }}
                />
                {/* Heart Icon - Bottom Right */}
                <button
                  onClick={() => {
                    const isInWishlist = wishlistItems.some(item => item.productId === product.productId);
                    if (isInWishlist) {
                      handleRemoveFromWishlist(product.productId);
                    } else {
                      handleAddToWishlist(product);
                    }
                  }}
                  className="absolute bottom-4 right-4 text-red-500 hover:text-red-700"
                >
                  {wishlistItems.some(item => item.productId === product.productId) ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        fill="red"
                        strokeWidth="1"
                      />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        fill="none"
                        strokeWidth="1"
                      />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-xl font-semibold mb-4">Your wishlist is empty</p>
            <p className="text-gray-600 text-sm mb-4">
              Browse products and add your favorites to the wishlist!
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Wishlist;
