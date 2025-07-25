import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,

  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  UPDATE_USER_REQUEST,
  USER_DETAILS_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
} from "../constants/userConstant";
import { toast } from "react-toastify";

const token = localStorage.getItem('token');
const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;


// login user
export function login(email, password) {



  return async function (dispatch) {
    try {
      dispatch({ type: LOGIN_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `${BASE_URL}/login`,

        { email, password },
        config
      );

      // console.log(data);
      localStorage.setItem("token", data.token)
      //const { data1 } = await axios.get("/api/v1/profile");

      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
      toast.success("Login Success!")
      sessionStorage.setItem("user", JSON.stringify(data.user));

    } catch (error) {
      toast.error("Wrong ID or Password")
      dispatch({ type: LOGIN_FAIL, payload: error.message });
    }
  };
}
// resgister user
export function signUp(signupData) {

  return async function (dispatch) {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      const { data } = await axios.post(
        `${BASE_URL}/register`,

        signupData,
        config
      );

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });

    } catch (error) {
      dispatch({ type: REGISTER_USER_FAIL, payload: error.message })
      toast.error("Failed to Create New User");
    }

  }

}

// Load User (user Profile) if logged in before

export const load_UserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    
    const token = localStorage.getItem('token');
    
    const config = {
      headers: { 
        Authorization: `${token}`
      }
    };

    // Try getting from session storage first
    const userData = sessionStorage.getItem("user");
    if (userData && userData !== "undefined") {
      const user = JSON.parse(userData);
      dispatch({ type: LOAD_USER_SUCCESS, payload: user });
    } else {
      // If not in session storage, make API call
      const { data } = await axios.get(`${BASE_URL}/profile`, config);
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
      sessionStorage.setItem("user", JSON.stringify(data.user));
    }
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.message });
  }
};


// logout user 
export function logout() {
  return async function (dispatch) {
    try {
      sessionStorage.removeItem("user");
      localStorage.removeItem("token");
      await axios.get(`${BASE_URL}/logout`); // token will expired from cookies and no more user data access
      dispatch({ type: LOGOUT_SUCCESS });

    } catch (error) {
      sessionStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch({ type: LOGOUT_FAIL, payload: error.message });
    }
  }
}


// Update Profile => 
export function updateProfile(userData) {
  return async function (dispatch) {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });

      const config = {
        headers: { "Content-Type": "multipart/form-data", Authorization: `${token}` },

      };


      const { data } = await axios.put(
        `${BASE_URL}/profile/update`,

        userData,
        config
      );

      if (data.user !== undefined && data.user) {
        sessionStorage.removeItem("user");
        sessionStorage.setItem("user", JSON.stringify(data.user))
      }

      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.message })
    }
  }
}

// update password
export function updatePassword(userPassWord) {
  return async function (dispatch) {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });

      const config = {
        headers: { "Content-Type": "application/json", Authorization: `${token}` }
      };

      const { data } = await axios.put(
        `${BASE_URL}/password/update`,

        userPassWord,
        config
      );

      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data.success,
      });
    } catch (error) {

      dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.message })
    }
  }
}

// forgetPassword;
export function forgetPassword(email) {
  return async function (dispatch) {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${BASE_URL}/password/forgot`,
        { email }, // ✅ wrap it in object
        config
      );

      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
}

// reset password action
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${BASE_URL}/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


// get All user Action --> admin 
export const getAllUsers = () => async (dispatch) => {

  try {

    dispatch({ type: ALL_USERS_REQUEST })

    const config = {
      headers: { Authorization: `${token}` }
    };

    const { data } = await axios.get(`${BASE_URL}/admin/users`,

      config
    );

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });

  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.message })
  }

}

// get User details --> admin

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })
    const config = {
      headers: {
        Authorization: `${token}`,
      }
    };
    const { data } = await axios.get(`${BASE_URL}/admin/user/${id}`, config);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });

  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, error: error.message });
  }
}

// upadte user role ---> admin
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST })

    const config = { headers: { "Content-Type": "application/json", Authorization: `${token}` } }
    const { data } = await axios.put(
      `${BASE_URL}/admin/user/${id}`, userData,

      config
    );
    console.log(data);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });

  } catch (error) {
    dispatch({ type: UPDATE_USER_FAIL, payload: error.message })
  }

}

// detele User ---> admin

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json", Authorization: `${token}` }
    };
    const { data } = await axios.delete(`${BASE_URL}/admin/user/${id}`, config);
    dispatch({ type: DELETE_USER_SUCCESS, payload: data })

  } catch (error) {
    dispatch({ type: DELETE_USER_FAIL, payload: error.message })
  }

}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
