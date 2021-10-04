import { combineReducers } from "redux";
import cartReducer from "../reducers/cart";

export default combineReducers({
  cart: cartReducer,
});
