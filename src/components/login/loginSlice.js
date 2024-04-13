import { createSlice } from "@reduxjs/toolkit";
const localStoredToken = localStorage.getItem("idToken");
const loginState = {
  token: localStoredToken,
  loginStatus: !!localStoredToken,
};
console.log(loginState);

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loginState,
  reducers: {
    logIn: (state, action) => {
      state.token = action.payload.idToken;
      state.loginStatus = !!action.payload.idToken;
      localStorage.setItem("idToken", action.payload.idToken);
    },
  },
});
export const loginSliceAction = loginSlice.actions;
export default loginSlice;
