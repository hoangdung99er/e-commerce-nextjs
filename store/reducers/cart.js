import { createSlice } from "@reduxjs/toolkit";
import * as types from "../constants/ActionTypes";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

// const cartSlice = createSlice({
//   name: "cart-event-trigger",
//   initialState,
//   reducers: {
//     addProduct(state, action) {
//       state.quantity += 1;
//       state.products.push({
//         product: action.payload.newProduct,
//         quantity: action.payload.quantity,
//       });
//       state.total += action.payload.price;
//     },
//   },
// });

const totalQuantityHandler = (products, id) => {
  let count;
  const existingProduct = products.find(({ product }, i) => {
    return product.id === id;
  });
  if (existingProduct) count = 1;
  count = products.length;
  return count;
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_CART:
      if (state.quantity === 0) {
        state.products.push({
          product: payload.newProduct,
          quantity: payload.quantity,
        });
      } else {
        let check = false;
        state.products.map(({ product, quantity }, i) => {
          if (product.id === payload.id) {
            state.products[i].quantity = payload.quantity;
            check = true;
          }
        });
        if (!check) {
          state.products.push({
            product: payload.newProduct,
            quantity: payload.quantity,
          });
        }
      }

      const newTotal = state.products.reduce(
        (total, { product, quantity }) => total + product.price * quantity,
        0
      );

      const newQuantity = totalQuantityHandler(state.products, payload.id);

      return {
        ...state,
        quantity: newQuantity,
        total: newTotal,
      };

    default:
      return state;
  }
};

export const products = (state) => state.cart.products;
export const quantity = (state) => state.cart.quantity;
export const total = (state) => state.cart.total;

export default cartReducer;
