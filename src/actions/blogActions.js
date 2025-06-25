import axios from "axios";
import {
  CREATE_BLOG_POST_REQUEST,
  CREATE_BLOG_POST_SUCCESS,
  CREATE_BLOG_POST_FAIL,
  GET_ALL_BLOG_POSTS_REQUEST,
  GET_ALL_BLOG_POSTS_SUCCESS,
  GET_ALL_BLOG_POSTS_FAIL,
  GET_BLOG_POST_DETAILS_REQUEST,
  GET_BLOG_POST_DETAILS_SUCCESS,
  GET_BLOG_POST_DETAILS_FAIL,
  UPDATE_BLOG_POST_REQUEST,
  UPDATE_BLOG_POST_SUCCESS,
  UPDATE_BLOG_POST_FAIL,
  DELETE_BLOG_POST_REQUEST,
  DELETE_BLOG_POST_SUCCESS,
  DELETE_BLOG_POST_FAIL,
  CLEAR_BLOG_ERRORS,
  CLEAR_BLOG_MESSAGE,
} from "../constants/blogConstants";

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

// Create Blog Post -- Admin
export const createBlogPost = (postData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BLOG_POST_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token, 
      },
      withCredentials: true,
    };

    const { data } = await axios.post(`${BASE_URL}/admin/blog/new`, postData, config);

    dispatch({
      type: CREATE_BLOG_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_BLOG_POST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get All Blog Posts
export const getAllBlogPosts = () => async (dispatch) => {
  try {
    console.log("🚀 [getAllBlogPosts] Dispatching request...");
    dispatch({ type: GET_ALL_BLOG_POSTS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/blogs`);
    console.log("✅ [getAllBlogPosts] Data received:", data); // ✅ Confirm this

    dispatch({
      type: GET_ALL_BLOG_POSTS_SUCCESS,
      payload: data.blogs,
    });
  } catch (error) {
    console.error("🔥 [getAllBlogPosts] Error:", error.response?.data || error.message);
    dispatch({
      type: GET_ALL_BLOG_POSTS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


// Get Blog Post Details
export const getBlogPostDetails = (postId) => async (dispatch) => {
  try {
    dispatch({ type: GET_BLOG_POST_DETAILS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/blog/${postId}`);

    dispatch({
      type: GET_BLOG_POST_DETAILS_SUCCESS,
      payload: data.blog,
    });
  } catch (error) {
    dispatch({
      type: GET_BLOG_POST_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update Blog Post -- Admin
export const updateBlogPost = (postId, postData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BLOG_POST_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      withCredentials: true,
    };

    const { data } = await axios.put(`${BASE_URL}/admin/blog/${postId}`, postData, config);
    console.log("🚀 [updateBlogPost] Data received:", data); // ✅ Confirm this

    dispatch({
      type: UPDATE_BLOG_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BLOG_POST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete Blog Post -- Admin
export const deleteBlogPost = (postId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BLOG_POST_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
      withCredentials: true,
    };

    const { data } = await axios.delete(`${BASE_URL}/admin/blog/${postId}`, config);

    dispatch({
      type: DELETE_BLOG_POST_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BLOG_POST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Clear Blog Errors
export const clearBlogErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_BLOG_ERRORS });
};

// Clear Blog Message
export const clearBlogMessage = () => (dispatch) => {
  dispatch({ type: CLEAR_BLOG_MESSAGE });
};
