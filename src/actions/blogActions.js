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
  CLEAR_BLOG_ERRORS,
  CLEAR_BLOG_MESSAGE,
} from "../constants/blogConstants";

// Create Blog Post -- Admin
export const createBlogPost = (postData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BLOG_POST_REQUEST });

    const token = localStorage.getItem("adminToken"); // Assuming token is stored here
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post("/api/v1/admin/blog/new", postData, config);

    dispatch({
      type: CREATE_BLOG_POST_SUCCESS,
      payload: data, // Assuming API returns { success: true, post: newPost }
    });
  } catch (error) {
    dispatch({
      type: CREATE_BLOG_POST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Get All Blog Posts
export const getAllBlogPosts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_BLOG_POSTS_REQUEST });

    const { data } = await axios.get("/api/v1/blog");

    dispatch({
      type: GET_ALL_BLOG_POSTS_SUCCESS,
      payload: data.posts, // Assuming API returns { success: true, posts: [...] }
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_BLOG_POSTS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Get Blog Post Details
export const getBlogPostDetails = (postId) => async (dispatch) => {
  try {
    dispatch({ type: GET_BLOG_POST_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/blog/${postId}`);

    dispatch({
      type: GET_BLOG_POST_DETAILS_SUCCESS,
      payload: data.post, // Assuming API returns { success: true, post: {...} }
    });
  } catch (error) {
    dispatch({
      type: GET_BLOG_POST_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Clear Blog Errors
export const clearBlogErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_BLOG_ERRORS });
};

// Clear Blog Success Message
export const clearBlogMessage = () => (dispatch) => {
  dispatch({ type: CLEAR_BLOG_MESSAGE });
};
