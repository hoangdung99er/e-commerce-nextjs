import * as types from "../constants/ActionTypes";
import { persistReducer } from "redux-persist";
import storage from "../config/storage";
import { PanoramaWideAngle } from "@material-ui/icons";

const initialState = {
  currentUser: null,
  isFetching: false,
  error: null,
  success: false,
  favOfUser: [],
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOGIN_START:
      return {
        ...state,
        isFetching: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currentUser: payload.user,
        success: true,
        favOfUser: payload.user.isFavorite,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: payload.error,
      };
    case types.CLEAR_ERROR:
      return {
        ...state,
        error: null,
        success: false,
      };
    case types.ADD_PRODUCT_FAVORITE:
      return {
        ...state,
        favOfUser: [...state.favOfUser, payload.favProduct],
      };
    case types.REMOVE_PRODUCT_FAVORITE:
      return {
        ...state,
        favOfUser: state?.favOfUser?.filter(({ _id }) => _id !== payload.id),
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "auth__currentUser",
  storage: storage,
  whitelist: ["currentUser", "favOfUser"],
};

export const user = (state) => state.user;

export default persistReducer(persistConfig, userReducer);
