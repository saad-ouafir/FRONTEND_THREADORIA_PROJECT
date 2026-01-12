import axiosInstance from "./axiosInstance";
import setToken from "../utils/auth/setToken";
import setProfile from "../utils/profile/setProfile";
import clearProfile from "../utils/profile/clearProfile";
import revokeToken from "../utils/auth/revokeToken";
export async function login(data) {
  const response = await axiosInstance.post("/auth/login", data);
  setToken(response.data.accessToken);
  setProfile(response.data.user);
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
    profile_metadata: null,
  };
  const response = await axiosInstance.post("/auth/register", payload);
  setToken(response.data.accessToken);
  setProfile(response.data.user);
  return {
    status: response.status,
    message: response.data.message,
    accessToken: response.data.accessToken,
    user: response.data.user,
  };
}

export async function logout() {
  const response = await axiosInstance.post("/auth/logout");
  revokeToken();
  clearProfile();
  return {
    status: response.status,
    message: response.data.message,
  };
}

export async function refreshToken() {
  const response = await axiosInstance.post("/auth/refresh");
  setToken(response.data.accessToken);
  return {
    status: response.status,
    message: response.data.message,
    accessToken: response.data.accessToken,
    user: response.data.user,
  };
}

export async function updateAccount(data) {
  const response = await axiosInstance.put("/auth/update", data);
  clearProfile();
  setProfile(response.data.user);
  return {
    status: response.status,
    message: response.data.message,
    user: response.data.user,
  };
}

export async function deleteAccount() {
  const response = await axiosInstance.delete("/auth/delete");
  revokeToken();
  clearProfile();
  return {
    status: response.status,
    message: response.data.message,
  };
}
