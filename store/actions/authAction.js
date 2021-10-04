import apiCall from "../lib/apiCall";
import cookie from "js-cookie";

export const onSignIn = (user, router) => {
  return async (dispatch) => {
    try {
      const response = await apiCall("auth/login", "POST", user, {
        "Content-Type": "application/json",
        Accept: "application/json",
      });

      if (response && response?.token) {
        cookie.set("token", response?.token, {
          secure: process.env.NODE_ENV !== "development",
          expires: 2,
          sameSite: "strict",
          path: "/",
        });
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
