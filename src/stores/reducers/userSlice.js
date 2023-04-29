import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
  },
  reducers: {
    userInfoStore(state, action) {
      state.userInfo = { ...action.payload };
    },
    userInfoRemove(state) {
      state.userInfo = null;
    },
  },
});

const userReducer = userSlice.reducer;

export const { userInfoStore, userInfoRemove } = userSlice.actions;

export default userReducer;
