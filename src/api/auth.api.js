import axiosInstance from "./axiosInstance";

export async function login(data) {
  const response = await axiosInstance.post("/auth/login", data);
  return {
    status: response.status,
    message: response.data.message,
    accessToken: response.data.accessToken,
    user: response.data.user,
  };
}

export async function signUp(data) {
  const payload = {
    username: data.username,
    full_name: data.full_name,
    email: data.email,
    password: data.password,
    is_private: data.is_private || false,
    profile_picture_url: null,
    profile_picture_cdn: null,
    profile_picture_provider: null,
  };
  const response = await axiosInstance.post("/auth/register", payload);
  return {
    status: response.status,
    message: response.data.message,
    accessToken: response.data.accessToken,
    user: response.data.user,
  };
}

export async function logout() {
  const response = await axiosInstance.post("/auth/logout");
  return {
    status: response.status,
    message: response.data.message,
  };
}

export async function refreshToken() {
  const response = await axiosInstance.post("/auth/refresh");
  return {
    status: response.status,
    message: response.data.message,
    accessToken: response.data.accessToken,
  };
}
