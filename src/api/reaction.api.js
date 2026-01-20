import axiosInstance from "./axiosInstance";

// Like a thread
async function likeThread(threadId) {
  const response = await axiosInstance.post(`/reactions/like/${threadId}`);
  return {
    status: response.status,
    message: response.data.message,
    liked: response.data.liked,
    likes_count: response.data.likes_count,
  };
}

// Unlike a thread
async function unlikeThread(threadId) {
  const response = await axiosInstance.delete(`/reactions/like/${threadId}`);
  return {
    status: response.status,
    message: response.data.message,
    liked: response.data.liked,
    likes_count: response.data.likes_count,
  };
}

// Check if user liked a thread
async function checkUserLike(threadId) {
  try {
    const response = await axiosInstance.get(`/reactions/check/${threadId}`);
    return {
      status: response.status,
      liked: response.data.liked,
    };
  } catch {
    // If endpoint doesn't exist yet, assume not liked
    return {
      status: 404,
      liked: false,
    };
  }
}

// Share a thread
async function shareThread(threadId) {
  const response = await axiosInstance.post(`/reactions/share/${threadId}`);
  return {
    status: response.status,
    message: response.data.message,
    shared: response.data.shared,
    shares_count: response.data.shares_count,
  };
}

export { likeThread, unlikeThread, checkUserLike, shareThread };
