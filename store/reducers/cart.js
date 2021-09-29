import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: null,
};

const cartSlice = createSlice({
  name: "cart-event-trigger",
  initialState,
  reducers: {
    getCart(state, action) {
      state.cart = action.payload;
    },
  },
});

export const { getCart } = cartSlice.actions;
export const cart = (state) => state.cart.cart;
export default cartSlice.reducer;
