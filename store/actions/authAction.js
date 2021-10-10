import apiCall from "../lib/apiCall";
import cookie from "js-cookie";
import * as types from "../constants/ActionTypes";

const loginStart = () => {
  return {
    type: types.LOGIN_START,
  };
};

const loginFailure = (error) => {
  return {
    type: types.LOGIN_FAILURE,
    payload: {
      error,
    },
  };
};

const loginSuccess = (user) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: {
      user,
    },
  };
};

export const clearError = () => {
  return {
    type: types.CLEAR_ERROR,
  };
};

export const addFavoriteProduct = (product) => {
  return {
    type: types.ADD_PRODUCT_FAVORITE,
    payload: {
      favProduct: product,
    },
  };
};

export const removeFavoriteProduct = (id) => {
  return {
    type: types.REMOVE_PRODUCT_FAVORITE,
    payload: {
      id,
    },
  };
};

export const onSignIn = (user, router) => {
  return async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await apiCall("auth/login", "POST", user, {
        "Content-Type": "application/json",
        Accept: "application/json",
      });

      if (response && response?.token) {
        cookie.set("token", response?.token, {
          secure: process.env.NODE_ENV !== "development",
          expires: 2,
          sameSite: "strict",
          path: "/",
        });
        router.push("/") && dispatch(loginSuccess(response?.user));
      }
      dispatch(loginFailure(response?.message));
    } catch (error) {
      dispatch(loginFailure(error));
      console.log(error);
    }
  };
};
