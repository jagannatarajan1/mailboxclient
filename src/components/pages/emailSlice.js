import { createSlice } from "@reduxjs/toolkit";
const initialData = {
  emailData: {},
  totalUnreadedMessage: 0,
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
  },
});
export const emailSliceAction = emailSlice.actions;
export default emailSlice;
