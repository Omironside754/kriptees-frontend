import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstant";
import axios from "axios";
// Add to Cart
export const addItemToCart = (id, quantity, size) => async (dispatch, getState) => {
  
  const { data } = await axios.get(`https://kriptees-backend-ays7.onrender.com/api/v1/product/${id}`);
  
  dispatch({
    type: ADD_TO_CART,
    payload: {
      productId: data.Product._id,
      name: data.Product.name,
      price: data.Product.price,
      image: data.Product.images[0].url,
      stock: data.Product.Stock,
      size: size,
      quantity,
    },
  });

  // Save cart data to localStorage after dispatching the action
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
};



// Remove item from Cart
export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: id });

  // Save cart data to localStorage after dispatching the action
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
};

// Save Shipping Info
export const saveShippingInfo = (data) => async (dispatch, getState) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  // Save shipping info data to localStorage after dispatching the action
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
