import { ADD_TO_WISHLIST, REMOVE_WISHLIST_ITEM } from "../constants/wishlistConstants";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

// Add to Wishlist
export const addItemToWishlist = (id) => async (dispatch, getState) => {
  // Fetch product details using the id
  const { data } = await axios.get(`${BASE_URL}/product/${id}`);
  
  // Dispatch the action to add to wishlist
  dispatch({
    type: ADD_TO_WISHLIST,
    payload: {
      productId: data.Product._id,
      name: data.Product.name,
      price: data.Product.price,
      image: data.Product.images[0].url,
      stock: data.Product.Stock,
    },
  });

  // Save wishlist data to localStorage after dispatching the action
  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
};

// Remove item from Wishlist
export const removeItemFromWishlist = (id) => async (dispatch, getState) => {
  // Dispatch the action to remove from wishlist
  dispatch({ type: REMOVE_WISHLIST_ITEM, payload: id });

  // Save wishlist data to localStorage after dispatching the action
  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
};
