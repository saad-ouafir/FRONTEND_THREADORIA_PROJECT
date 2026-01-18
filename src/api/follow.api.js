import axiosInstance from "./axiosInstance";

// Get Following / Followers
async function getFollowers(userId) {
  const response = await axiosInstance.get(`/follow/${userId}/followers`);
  return {
    status: response.status,
    followers: response.data.followers,
  };
}
async function getFollowing(userId) {
  const response = await axiosInstance.get(`/follow/${userId}/following`);
  return {
    status: response.status,
    following: response.data.following,
  };
}

// Follow / Unfollow
async function followUser(followingId) {
  const response = await axiosInstance.post("/follow/follow", followingId);
  return {
    status: response.status,
    message: response.data.message,
    followStatus: response.data.followStatus,
  };
}
async function unfollowUser(data) {
  const response = await axiosInstance.post("/follow/unfollow", data);
  return {
    status: response.status,
    message: response.data.message,
  };
}

async function getFollowRequests() {
  const response = await axiosInstance.get("/follow/requests");
  return {
    status: response.status,
    requests: response.data.requests,
  };
}
async function acceptFollowRequest(data) {
  const response = await axiosInstance.post("/follow/requests/accept", data);
  return {
    status: response.status,
    message: response.data.message,
  };
}
async function rejectFollowRequest(data) {
  const response = await axiosInstance.post("/follow/requests/reject", data);
  return {
    status: response.status,
    message: response.data.message,
  };
}

export {
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
  getFollowRequests,
  acceptFollowRequest,
  rejectFollowRequest,
};
