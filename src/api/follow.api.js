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
async function toggleFollow(followingId) {
  const response = await axiosInstance.post("/follow/follow", { followingId: followingId });
  return {
    status: response.status,
    message: response.data.message,
    followStatus: response.data.followStatus,
  };
}

async function getFollowRequests() {
  const response = await axiosInstance.get("/follow/requests");
  return {
    status: response.status,
    message: response.data.message,
    followRequests: response.data.followRequests,
  };
}
async function acceptFollowRequest(followerID) {
  const response = await axiosInstance.post("/follow/requests/accept", { followerID: followerID });
  return {
    status: response.status,
    message: response.data.message,
  };
}
async function rejectFollowRequest(followerID) {
  const response = await axiosInstance.post("/follow/requests/reject", followerID);
  return {
    status: response.status,
    message: response.data.message,
  };
}

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
