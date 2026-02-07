//-----------------------------------
// API Methods for Follow / Follow requests
//-----------------------------------

import axiosInstance from "./axiosInstance";

// Get Following
async function getFollowers(userId) {
  const response = await axiosInstance.get(`/follow/${userId}/followers`);
  return {
    status: response.status,
    followers: response.data.followers,
  };
}

// Get Followers
async function getFollowing(userId) {
  const response = await axiosInstance.get(`/follow/${userId}/following`);
  return {
    status: response.status,
    following: response.data.following,
  };
}

// Follow / Unfollow
async function toggleFollow(followingId) {
  const response = await axiosInstance.post("/follow/follow", { followingId: followingId });
  return {
    status: response.status,
    message: response.data.message,
    followStatus: response.data.followStatus,
  };
}

// Get Follow Requests
async function getFollowRequests() {
  const response = await axiosInstance.get("/follow/requests");
  return {
    status: response.status,
    message: response.data.message,
    followRequests: response.data.followRequests,
  };
}

// Accept Follow Requests
async function acceptFollowRequest(followerID) {
  const response = await axiosInstance.post("/follow/requests/accept", { followerID: followerID });
  return {
    status: response.status,
    message: response.data.message,
  };
}

// Reject Follow Requests
async function rejectFollowRequest(followerID) {
  const response = await axiosInstance.post("/follow/requests/reject", { followerID: followerID });
  return {
    status: response.status,
    message: response.data.message,
  };
}

// Unfollow a user
async function removeFollower(followerId) {
  const response = await axiosInstance.post("/follow/remove-follower", { followerId });
  return {
    status: response.status,
    message: response.data.message,
  };
}

export {
  getFollowers,
  getFollowing,
  toggleFollow,
  getFollowRequests,
  acceptFollowRequest,
  rejectFollowRequest,
  removeFollower,
};
