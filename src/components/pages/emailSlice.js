import { createSlice } from "@reduxjs/toolkit";
const initialData = {
  emailData: {},
  totalUnreadedMessage: 0,
  refresh: false,
};
const emailSlice = createSlice({
  name: "emailSlice",
  initialState: initialData,
  reducers: {
    viewFullMessage: (state, action) => {
      state.emailData = action.payload;
    },
    unreadedMessage: (state, action) => {
      state.totalUnreadedMessage = action.payload;
    },
    refreshScreen: (state, action) => {
      state.refresh = !state.refresh;
    },
  },
});
export const emailSliceAction = emailSlice.actions;
export default emailSlice;
