import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../login/loginSlice";
import emailSlice from "../pages/emailSlice";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    email: emailSlice.reducer,
  },
});
export default store;
