import { combineReducers } from "redux";
import cartReducer from "../reducers/cart";
import userReducer from "../reducers/user";
import productReducer from "../reducers/products";

export default combineReducers({
  cart: cartReducer,
  user: userReducer,
  products: productReducer,
});
