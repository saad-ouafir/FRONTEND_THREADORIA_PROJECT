import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { accessToken: null },
  reducers: {
    setToken(state, action) {
      state.isAuth = true;
      state.accessToken = action.payload;
    },
    revokeToken(state) {
      state.isAuth = false;
      state.accessToken = null;
    },
  },
});

export const { setToken, revokeToken } = authSlice.actions;
export default authSlice.reducer;
