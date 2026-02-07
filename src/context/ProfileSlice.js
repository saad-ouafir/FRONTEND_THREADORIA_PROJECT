//-----------------------------------
// Redux Slice for current user Profile
//-----------------------------------

import { createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../utils/formatters/formatDate";

// Get initial state from local storage if exists or return empty values by default
const getInitialState = () => {
  try {
    const stored = localStorage.getItem("userProfile");
    return stored
      ? JSON.parse(stored)
      : {
          id: null,
          full_name: "",
          username: "",
          bio: "",
          profile_picture_url: "",
          profile_metadata: null,
          follower_count: 0,
          following_count: 0,
          is_private: false,
          created_at: null,
        };
  } catch {
    return {
      id: null,
      full_name: "",
      username: "",
      bio: "",
      profile_picture_url: "",
      profile_metadata: null,
      follower_count: 0,
      following_count: 0,
      is_private: false,
      created_at: null,
    };
  }
};

// Redux Slice for current user Profile
const profileSlice = createSlice({
  name: "profile",
  initialState: getInitialState(),
  reducers: {
    setProfileData(state, action) {
      const data = action.payload;
      state.id = data.id;
      state.full_name = data.full_name;
      state.username = data.username;
      state.bio = data.bio;
      state.profile_picture_url = data.profile_picture_url;
      state.profile_metadata = data.profile_metadata;
      state.follower_count = data.follower_count;
      state.following_count = data.following_count;
      state.is_private = data.is_private;
      state.created_at = formatDate(data.created_at);
      localStorage.setItem("userProfile", JSON.stringify(state));
    },
    clearProfileData(state) {
      state.id = null;
      state.full_name = "";
      state.username = "";
      state.bio = "";
      state.profile_picture_url = "";
      state.profile_metadata = null;
      state.follower_count = 0;
      state.following_count = 0;
      state.is_private = false;
      state.created_at = null;
      localStorage.removeItem("userProfile");
    },
  },
});

export const { setProfileData, clearProfileData } = profileSlice.actions;
export default profileSlice.reducer;
