import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  CLEAR_ERRORS,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_FAIL,
  ALL_ORDERS_SUCCESS,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  TRACK_ORDER_REQUEST,
  TRACK_ORDER_SUCCESS,
  TRACK_ORDER_FAIL,
} from "../constants/orderConstant";
import axios from "axios";


export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const token = localStorage.getItem('token');

    const config = {
      headers: { "Content-Type": "application/json", Authorization: `${token}` }

    };

    const { data } = await axios.post("https://kriptees-backend.onrender.com/api/v1/order/new", order, config);


    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAIL, payload: error.message });
  }
};

// get all orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `${token}`,
      }
    };

    const { data } = await axios.get("https://kriptees-backend.onrender.com/api/v1/orders/myOrders", config);
   // console.log("My Orders Data:", data); 


    dispatch({ type: MY_ORDER_SUCCESS, payload: data.userOrders });
  } catch (error) {
    console.error("My Orders Error:", error); // Add this line for debugging
    dispatch({ type: MY_ORDER_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message });
  }
};

// get single order

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });


    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `${token}`,
      }
    };


    const { data } = await axios.get(`https://kriptees-backend.onrender.com/api/v1/order/${id}`, config);


    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
};

export const getAllOrders = () => async (dispatch) => {

  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `${token}`,
      }
    };

    const { data } = await axios.get(`https://kriptees-backend.onrender.com/api/v1/admin/orders`, config);


    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({ type: ALL_ORDERS_FAIL, payload: error.message });
  }

};

export const trackOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: TRACK_ORDER_REQUEST });

    const token = localStorage.getItem('token');
    const config = {
      headers: { "Content-Type": "application/json", Authorization: `${token}` }
    };

    const { data } = await axios.get(`https://kriptees-backend.onrender.com/api/v1/order/track/${orderId}`, config);
    console.log("Tracking Data:", data); // Add this line for debugging

    dispatch({ type: TRACK_ORDER_SUCCESS, payload: data });
  } catch (error) {
    console.error("Tracking Error:", error); // Add this line for debugging
    dispatch({ type: TRACK_ORDER_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message });
  }
};


// delet Order --> admin
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `${token}`,
      }
    };

    const { data } = await axios.delete(`https://kriptees-backend.onrender.com/api/v1/admin/order/${id}`, config);


    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: DELETE_ORDER_FAIL, payload: error.message });
  }
};

// update order --> admin (status update) 
export const updateOrder = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const token = localStorage.getItem('token');

    const config = {
      headers: { "Content-Type": "application/json", Authorization: `${token}` },

    };
    const { data } = await axios.put(
      `https://kriptees-backend.onrender.com/api/v1/admin/order/${id}`,

      productData,
      config
    );
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_ORDER_FAIL, payload: error.message });
  }
};

// clear errors

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
