import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
  ALL_REVIEW_FAIL,
} from "../constants/productsConstants";

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

// get ALL Products
export const getProduct = (
  keyword = "",
  currentPage = 1,
  price = [0, 25000],
  category,
  ratings = 0
) => {
  return async (dispatch) => {
    try {
      // initial state :
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });

      let link = `${BASE_URL}/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      // when category selected by user then using another link
      if (category) {
        link = `${BASE_URL}/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&category=${category}`;

      }
      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
        totalProducts: data.totalProducts,
        filterdProductCount : data.filterdProductCount,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.message,
      });
    }
  };
};

// Get Products Details
export const getProductDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_DETAILS_REQUEST,
      });

      const { data } = await axios.get(`${BASE_URL}/product/${id}`);


      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.Product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.message,
      });
    }
  };
};

//Add new Review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,

      }
    };

    const { data } = await axios.put(`${BASE_URL}/review/new`, reviewData, config);


    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: NEW_REVIEW_FAIL, payload: error.message });
  }
};

// admin product request :
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`,
      }
    };

    const { data } = await axios.get(`${BASE_URL}/admin/products`, config);


    dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({ type: ADMIN_PRODUCT_FAIL, payload: error.message });
  }
};

// Create Product
export function createProduct(productData) {
  return async function (dispatch) {
    try {
      dispatch({
        type: NEW_PRODUCT_REQUEST,
      });

      const token = localStorage.getItem('token');

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        }
      };

      const { data } = await axios.post(
        `${BASE_URL}/admin/product/new`,

        productData,
        config
      );

      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.message,
      });
    }
  };
}

// Delete Product request

export function deleteProduct(id) {
  return async function (dispatch) {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        }
      };

      const { data } = await axios.delete(`${BASE_URL}/admin/product/${id}`, config);


      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.message });
    }
  };
}

// updateProduct;
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    console.log(productData)

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`,
      },
    };

    const { data } = await axios.put(
      `${BASE_URL}/admin/product/${id}`,

      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.message,
    });
  }
};

// get all review of product admin ==>
export const getAllreviews = (productId) => async (dispatch) => {

  try {
    dispatch({ type: ALL_REVIEW_REQUEST })

    const { data } = await axios.get(`${BASE_URL}/reviews?id=${productId}`);

    dispatch({ type: ALL_REVIEW_SUCCESS, payload: data.reviews })
  } catch (error) {
    dispatch({ type: ALL_REVIEW_FAIL, payload: error.message })
  }
}


// delete product review
export const deleteProductReview = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST })

    const { data } = await axios.delete(
      `${BASE_URL}/product/reviews/delete?id=${reviewId}&productId=${productId}`

    );

    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: DELETE_REVIEW_FAIL, payload: error.message })
  }

}


// clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
