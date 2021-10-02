import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart-event-trigger",
  initialState,
  reducers: {
    addProduct(state, action) {
      state.quantity += 1;
      state.products.push({
        product: action.payload.newProduct,
        quantity: action.payload.quantity,
      });
      state.total += action.payload.price;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export const quantity = (state) => state.cart.quantity;
export const products = (state) => state.cart.products;
export default cartSlice.reducer;
