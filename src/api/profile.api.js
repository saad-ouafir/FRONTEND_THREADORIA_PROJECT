import axiosInstance from "./axiosInstance";

async function getProfile(userId) {
  const response = await axiosInstance.get(`/profile/${userId}`);
  return {
    status: response.status,
    user: response.data.user,
  };
}

async function suggestProfiles(cursor, exclude) {
  const response = await axiosInstance.get(`/profile/suggest`, {
    cursor,
    exclude,
  });
  return {
    status: response.status,
    users: response.data.users,
  };
}
export { getProfile, suggestProfiles };
