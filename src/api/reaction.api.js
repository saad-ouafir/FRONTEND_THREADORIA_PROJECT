import axiosInstance from "./axiosInstance";

// Like or Unlike threads (toggling)
async function likeOrUnlikeThread(threadId) {
  const response = await axiosInstance.post(`/reactions/like/${threadId}`);
  return {
    status: response.status,
    message: response.data.message,
    liked: response.data.liked,
    likes_count: response.data.likes_count,
  };
}

// Share threads
async function shareThread(threadId) {
  const response = await axiosInstance.post(`/reactions/share/${threadId}`);
  return {
    status: response.status,
    message: response.data.message,
    shared: response.data.shared,
    shares_count: response.data.shares_count,
    shareUrl: response.data.shareUrl,
  };
}

export { likeOrUnlikeThread, shareThread };
