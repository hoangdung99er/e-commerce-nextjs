import * as types from "../constants/ActionTypes";

const initialState = {
  products: [],
  isFetching: false,
  error: null,
  success: false,
  favOfUser: null,
};

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.PRODUCT_START:
      return {
        ...state,
        isFetching: true,
      };
    case types.PRODUCT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        products: state.products.push(payload.product),
        success: true,
      };
    case types.PRODUCT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: payload.error,
      };
    case types.PRODUCT_FAVORITE:
      return {
        ...state,
        isFetching: false,
        favOfUser: payload.user,
      };
    default:
      return state;
  }
};

export const products = (state) => state.products;

export default productReducer;
