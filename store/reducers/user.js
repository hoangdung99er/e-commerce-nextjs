import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    userDecoded(state, action) {
      state.user = action.payload.user;
    },
    onStartLoadingLoginState(state, action) {
      state.isLoading = true;
    },
    onEndLoadingLoginState(state, action) {
      state.isLoading = false;
    },
  },
});

export const { userDecoded, onStartLoadingLoginState, onEndLoadingLoginState } =
  authSlice.actions;
export const user = (state) => state.user.user;
export const loading = (state) => state.user.isLoading;
export default authSlice.reducer;
