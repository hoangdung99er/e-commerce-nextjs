import apiCall from "../lib/apiCall";
import {
  onStartLoadingLoginState,
  onEndLoadingLoginState,
} from "../reducers/user";
import { getAllProducts } from "../reducers/products";

export const onCreateProduct = (product, router, token) => {
  return async (dispatch) => {
    try {
      const response = await apiCall("product/create", "POST", product, {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      });

      if (response) {
        router.push("/admin");
      }
    } catch (error) {
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

      dispatch(getAllProducts(response));
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const onEditProduct = (product, pid, token) => {
  return async (dispatch) => {
    try {
      await apiCall(`product/${pid}`, "PUT", product, {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      });
    } catch (error) {
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
