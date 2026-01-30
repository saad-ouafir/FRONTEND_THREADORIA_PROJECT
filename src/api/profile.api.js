import axiosInstance from "./axiosInstance";

async function getProfile(userId) {
  const response = await axiosInstance.get(`/profile/${userId}`);
  return {
    status: response.status,
    user: response.data.user,
  };
}

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
export { getProfile, suggestProfiles };
