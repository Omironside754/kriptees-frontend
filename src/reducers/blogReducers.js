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

// Reducer for creating & updating a blog post (Admin)
export const newBlogPostReducer = (
  state = { post: {}, loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case CREATE_BLOG_POST_REQUEST:
    case UPDATE_BLOG_POST_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };

    case CREATE_BLOG_POST_SUCCESS:
    case UPDATE_BLOG_POST_SUCCESS:
      return {
        loading: false,
        success: true,
        post: action.payload.post,
        error: null,
      };

    case CREATE_BLOG_POST_FAIL:
    case UPDATE_BLOG_POST_FAIL:
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
        posts: action.payload,
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
        post: action.payload,
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

// Reducer for deleting a blog post (Admin)
export const deleteBlogPostReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case DELETE_BLOG_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DELETE_BLOG_POST_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
      };

    case DELETE_BLOG_POST_FAIL:
      return {
        ...state,
        loading: false,
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
