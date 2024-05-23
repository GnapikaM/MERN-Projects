import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FETCH_USERS_FAIL,
  FETCH_USERS_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const register = (formData) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    dispatch({ type: REGISTER_SUCCESS, data });
  } catch (error) {
    console.error("Registration error: ", error);
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
  }
};

export const login =
  (
    formData,
    navigate,
    setFormData,
    initialState,
    setNotification,
    setNotificationMessage,
    setNotificationColor,
    setLoading
  ) =>
  async (dispatch) => {
    try {
      const { data } = await api.login(formData);
      dispatch({ type: LOGIN_SUCCESS, data });
      setTimeout(() => {
        navigate("/");
      }, 0);
    } catch (error) {
      console.error("Login error: ", error);
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
      setFormData(initialState);
      setNotification(true);
      setNotificationMessage("Invalid Email or Password!!!");
      setNotificationColor("red");
      setTimeout(() => {
        setNotification(false);
      }, 2000);
      setLoading(false);
    }
  };

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("Profile");
    dispatch({ type: LOGIN_FAIL });
  } catch (error) {
    console.error("Error logging out: ", error);
  }
};

export const checkAuth = () => async (dispatch) => {
  try {
    const profile = JSON.parse(localStorage.getItem("Profile"));
    if (profile && profile.token) {
      dispatch({ type: LOGIN_SUCCESS, data: profile });
    }
  } catch (error) {
    console.error("Error checking authentication: ", error);
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();
    dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    console.error("Fetch products error: ", error);
    dispatch({ type: FETCH_USERS_FAIL, payload: error.message });
  }
};

export const deleteAccount = (userId) => async (dispatch) => {
  dispatch({ type: DELETE_ACCOUNT_REQUEST });

  try {
    await api.deleteAccountByUserID(userId);

    dispatch({ type: DELETE_ACCOUNT_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_ACCOUNT_FAILURE, payload: error.response.data.message });
  }
};
