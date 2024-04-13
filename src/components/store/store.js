import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../login/loginSlice";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});
export default store;
