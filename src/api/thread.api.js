//-----------------------------------
// API Methods for Threads
//-----------------------------------

import axiosInstance from "./axiosInstance";

// Create new Threads
async function createThread(threadData) {
  const { content, parent_id } = threadData;
  const response = await axiosInstance.post("/threads/create", { content, parent_id: parent_id || null });
  return {
    status: response.status,
    message: response.data.message,
    thread: response.data.thread,
  };
}

// Get thread by ID
async function getThreadById(threadID) {
  const response = await axiosInstance.get(`/threads/thread/${threadID}`);
  return {
    status: response.status,
    thread: response.data.thread,
  };
}

// Get threads by user
async function getThreadsByUserID(userId, page = 1, limit = 10) {
  const response = await axiosInstance.get(`/threads/user/${userId}`, {
    params: { page, limit },
  });
  return {
    status: response.status,
    threads: response.data.threads,
    forbidden: response.data.forbidden,
    pagination: response.data.pagination,
  };
}

// Get suggested threads in "/home"
async function suggestThreads(tags = null, page = 1, limit = 10) {
  const params = { page, limit };
  if (tags) params.tags = tags;

  const response = await axiosInstance.get(`/threads/suggest`, { params });
  return {
    status: response.status,
    threads: response.data.threads,
    pagination: response.data.pagination,
  };
}

// Delete Thread
async function deleteThread(threadId) {
  const response = await axiosInstance.delete(`/threads/delete/${threadId}`);
  return {
    status: response.status,
    message: response.data.message,
  };
}

// Get sub threads (threads as type "replies")
async function getSubThreads(parentID) {
  const response = await axiosInstance.get(`/threads/subThreads/${parentID}`);
  return {
    status: response.status,
    threads: response.data.threads,
  };
}

// Search Threads that contains the query as a keyword
async function searchThreads(query, page = 1, limit = 10) {
  const response = await axiosInstance.get(`/threads/search`, {
    params: { search: query, page, limit },
  });
  return {
    status: response.status,
    threads: response.data.threads,
    pagination: response.data.pagination,
  };
}

export { createThread, getThreadsByUserID, suggestThreads, deleteThread, getThreadById, getSubThreads, searchThreads };
