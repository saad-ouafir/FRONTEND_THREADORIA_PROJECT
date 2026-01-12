import axiosInstance from "./axiosInstance";

export async function getSuggestedUsers() {
  try {
    const response = await axiosInstance.get("/social/suggestions");
    return {
      status: response.status,
      message: response.data.message,
      users: response.data.users,
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Failed to fetch suggested users",
      users: [],
    };
  }
}
