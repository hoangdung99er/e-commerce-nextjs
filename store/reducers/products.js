import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
};

const productSlice = createSlice({
  name: "products-event-trigger",
  initialState,
  reducers: {
    getAllProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const { getAllProducts } = productSlice.actions;
export const products = (state) => state.product.products;
export default productSlice.reducer;
