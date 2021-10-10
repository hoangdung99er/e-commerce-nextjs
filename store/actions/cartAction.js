import apiCall from "../lib/apiCall";
import * as types from "../constants/ActionTypes";

export const onCreateCart = (product, quantity, userId, token) => {
  return async (dispatch) => {
    try {
      const response = await apiCall(
        `cart/create`,
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
    } catch (error) {
      console.log(error);
    }
  };
};

export const onAddCart = (newProduct, quantity, id, price) => ({
  type: types.ADD_CART,
  payload: {
    newProduct,
    quantity,
    id,
    price,
  },
});

export const onRemoveItemCart = (id) => ({
  type: types.REMOVE_ITEM_CART,
  payload: {
    id,
  },
});

export const onAddQuantity = (id) => ({
  type: types.ADD_QUANTITY,
  payload: {
    id,
  },
});

export const onDeleteItemCart = (id) => ({
  type: types.DELETE_ITEM_CART,
  payload: {
    id,
  },
});

export const clearCart = () => ({
  type: types.CLEAR_CART,
});
