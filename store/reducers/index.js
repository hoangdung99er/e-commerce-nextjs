import { combineReducers } from "redux";
import userReducer from "../reducers/user";
import productReducer from "../reducers/products";
import cartReducer from "../reducers/cart";

export default combineReducers({
  cartReducer,
});
