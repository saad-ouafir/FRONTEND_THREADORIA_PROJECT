import axiosInstance from "./axiosInstance";
async function createTread(threadData) {
  const { content, parent_id } = threadData;
  const response = await axiosInstance.post("/threads/create", { content, parent_id: parent_id || null });
  return {
    status: response.status,
    message: response.data.message,
    thread: response.data.thread,
  };
}

async function getThreadById(threadID) {
  console.log("thread id from exec", threadID);
  const response = await axiosInstance.get(`/threads/thread/${threadID}`);
  return {
    status: response.status,
    thread: response.data.thread,
  };
}

async function getThreadsByUserID(userId) {
  const response = await axiosInstance.get(`/threads/user/${userId}`);
  return {
    status: response.status,
    threads: response.data.threads,
  };
}

async function suggestThreads(tags, limit) {
  const response = await axiosInstance.get(`/threads/suggest`, {
    tags,
    limit,
  });
  return {
    status: response.status,
    threads: response.data.threads,
  };
}

async function deleteThread(threadId) {
  const response = await axiosInstance.delete(`/threads/delete/${threadId}`);
  return {
    status: response.status,
    message: response.data.message,
  };
}

async function getSubThreads(parentID) {
  const response = await axiosInstance.get(`/threads/subThreads/${parentID}`);
  return {
    status: response.status,
    threads: response.data.threads,
  };
}

export { createTread, getThreadsByUserID, suggestThreads, deleteThread, getThreadById, getSubThreads };
