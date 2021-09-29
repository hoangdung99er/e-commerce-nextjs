import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import productReducer from "./reducers/products";
import cartReducer from "./reducers/cart";

export default configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
  },
});
