import { createSlice } from "@reduxjs/toolkit";
const localStoredToken = localStorage.getItem("idToken");
const localStoredEmail = localStorage.getItem("email");
const loginState = {
  token: localStoredToken,
  loginStatus: !!localStoredToken,
  email: localStoredEmail,
};
console.log(loginState);

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loginState,
  reducers: {
    logIn: (state, action) => {
      state.token = action.payload.idToken;
      state.loginStatus = !!action.payload.idToken;
      const alterdEmail = action.payload.email.replace("@gmail.com", "");
      state.email = alterdEmail;
      localStorage.setItem("idToken", action.payload.idToken);
      localStorage.setItem("email", alterdEmail);
    },
  },
});
export const loginSliceAction = loginSlice.actions;
export default loginSlice;
