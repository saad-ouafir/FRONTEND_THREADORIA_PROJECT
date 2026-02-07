//-----------------------------------
// Global Redux Store including :
// - Authentication
// - Profile
//-----------------------------------

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import profileReducer from "./ProfileSlice";
const GlobalStore = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export default GlobalStore;
