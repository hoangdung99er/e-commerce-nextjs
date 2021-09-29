import apiCall from "../lib/apiCall";
import {
  onStartLoadingLoginState,
  onEndLoadingLoginState,
} from "../reducers/user";
import { getCart } from "../reducers/cart";

export const onCreateCart = (product, quantity, userId, token) => {
  return async (dispatch) => {
    try {
      const response = await apiCall(
        "cart/create",
        "POST",
        {
          product,
          quantity,
          userId,
        },
        {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const onGetCart = (token) => {
  return async (dispatch) => {
    try {
      const response = await apiCall("cart/all", "GET", null, {
        Authorization: "Bearer " + token,
      });

      console.log(response);
      dispatch(getCart(response));
    } catch (error) {
      console.log(error);
    }
  };
};
