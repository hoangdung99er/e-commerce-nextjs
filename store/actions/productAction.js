import apiCall from "../lib/apiCall";
import * as types from "../constants/ActionTypes";

const startingProduct = () => ({
  type: types.PRODUCT_START,
});

const successProduct = (product) => ({
  type: types.PRODUCT_SUCCESS,
  payload: {
    product,
  },
});

const failureProduct = (error) => ({
  type: types.PRODUCT_FAILURE,
  payload: {
    error,
  },
});

export const onCreateProduct = (product, router, token) => {
  return async (dispatch) => {
    dispatch(startingProduct());
    try {
      const response = await apiCall("product/create", "POST", product, {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      });

      if (response) {
        router.push("/admin");
        dispatch(successProduct(response));
      }
      dispatch(failureProduct(response));
    } catch (error) {
      dispatch(failureProduct(error));
      console.log(error);
    }
  };
};

export const onGetAllProduct = (category) => {
  return async (dispatch) => {
    try {
      const response = category
        ? await apiCall(`product/all?category=${category}`)
        : await apiCall(`product/all`);

      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const onEditProduct = (product, pid, token) => {
  return async (dispatch) => {
    dispatch(startingProduct());
    try {
      const response = await apiCall(`product/${pid}`, "PUT", product, {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      });
      if (response) {
        dispatch(successProduct({}));
      }
      dispatch(failureProduct(response));
      return response;
    } catch (error) {
      dispatch(failureProduct(error));
      console.log(error);
    }
  };
};

export const onDeleteProduct = (pid, token) => {
  return async (dispatch) => {
    try {
      const response = await apiCall(`product/${pid}`, "DELETE", null, {
        Authorization: "Bearer " + token,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const onAddFavoriteProduct = (pid, token) => {
  return async (dispatch) => {
    try {
      const response = await apiCall(`user/favorite/${pid}`, "PUT", null, {
        Authorization: "Bearer " + token,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  };
};
