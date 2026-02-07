//-----------------------------------
// API Methods for Profile
//-----------------------------------

import axiosInstance from "./axiosInstance";

// Get current or another Profile
async function getProfile(userId) {
  const response = await axiosInstance.get(`/profile/${userId}`);
  return {
    status: response.status,
    user: response.data.user,
  };
}

// Suggets a list of profiles to follow
async function suggestProfiles(limit = 10, cursor = null, exclude = null) {
  const params = {};
  if (limit) params.limit = limit;
  if (cursor) params.cursor = cursor;
  if (exclude) params.exclude = exclude;

  const response = await axiosInstance.get(`/profile/suggest`, { params });
  return {
    status: response.status,
    users: response.data.users,
  };
}

// Search profiles where full_name or username contains the query as keyword
async function searchProfiles(query, page = 1, limit = 10) {
  const response = await axiosInstance.get(`/profile/search`, {
    params: { q: query, page, limit },
  });
  return {
    status: response.status,
    users: response.data.users,
    pagination: response.data.pagination,
  };
}

export { getProfile, suggestProfiles, searchProfiles };
