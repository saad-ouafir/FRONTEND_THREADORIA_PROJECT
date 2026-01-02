import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    return Promise.reject({
      status: data?.status || error.response?.status || 500,
      message: data?.message || "Something went wrong",
    });
  }
);

export async function login(data) {
  const response = await api.post("/api/auth/login", data);
  return {
    status: response.status,
    message: response.data.message,
  };
}

export async function register(data) {
  const payload = {
    username: data.username,
    email: data.email,
    password: data.password,
    is_private: data.is_private || false,
    profile_picture_url: null,
    profile_picture_cdn: null,
    profile_picture_provider: null,
  };
  const response = await api.post("/api/auth/register", payload);
  return {
    status: response.status,
    message: response.data.message,
  };
}

export async function logout() {
  const response = await api.post("/api/auth/logout");
  return {
    status: response.status,
    message: response.data.message,
  };
}

export async function refreshToken() {
  const response = await api.post("/api/auth/refresh");
  return {
    status: response.status,
    message: response.data.message,
  };
}
