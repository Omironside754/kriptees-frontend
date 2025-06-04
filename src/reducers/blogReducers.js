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

// Reducer for creating a new blog post (Admin)
export const newBlogPostReducer = (
  state = { post: {}, loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case CREATE_BLOG_POST_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case CREATE_BLOG_POST_SUCCESS:
      return {
        loading: false,
        success: true,
        post: action.payload.post, // Assuming payload is { success: true, post: ... }
        error: null,
      };
    case CREATE_BLOG_POST_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case CLEAR_BLOG_MESSAGE:
      return {
        ...state,
        success: false,
      };
    case CLEAR_BLOG_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Reducer for fetching all blog posts
export const blogPostsReducer = (
  state = { posts: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case GET_ALL_BLOG_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ALL_BLOG_POSTS_SUCCESS:
      return {
        loading: false,
        posts: action.payload, // Assuming payload is the array of posts
        error: null,
      };
    case GET_ALL_BLOG_POSTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_BLOG_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Reducer for fetching a single blog post details
export const blogPostDetailsReducer = (
  state = { post: {}, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case GET_BLOG_POST_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_BLOG_POST_DETAILS_SUCCESS:
      return {
        loading: false,
        post: action.payload, // Assuming payload is the post object
        error: null,
      };
    case GET_BLOG_POST_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_BLOG_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
