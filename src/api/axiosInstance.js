import axios from "axios";
import config from "../config/config";

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let accessToken = null;

export const setAccessToken = token => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

// Intercept & Attach access token to every request
axiosInstance.interceptors.request.use(config => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Simple error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const data = error.response?.data;
    const status = error.response?.status || 500;

    // Handle rate limit (429) errors
    if (status === 429 && data) {
      const blockedUntilTimestamp =
        typeof data.blockedUntil === "string"
          ? new Date(data.blockedUntil).getTime()
          : data.blockedUntil;

      const blockInfo = {
        error: data.error,
        blockType: data.blockType,
        blockedUntil: blockedUntilTimestamp,
        retryAfter: data.retryAfter,
        retryAfterFormatted: data.retryAfterFormatted,
      };

      // Only store and redirect if not already on blocked page
      if (!window.location.pathname.includes("/blocked")) {
        localStorage.setItem("rateLimitBlock", JSON.stringify(blockInfo));
        window.location.href = "/blocked";
      }

      return Promise.reject({
        status: 429,
        message: data.error || "Too many requests",
        blockInfo,
      });
    }

    return Promise.reject({
      status,
      message: data?.message || "Unexpected Error - Please try again",
    });
  }
);

export default axiosInstance;
