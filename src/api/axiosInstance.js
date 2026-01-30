import axios from "axios";
import config from "../config/config";
import getToken from "../utils/auth/getToken";
import setToken from "../utils/auth/setToken";
import revokeToken from "../utils/auth/revokeToken";
import clearProfile from "../utils/profile/clearProfile";

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Track if we're currently refreshing to prevent multiple refresh calls
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Intercept & Attach access token to every request
axiosInstance.interceptors.request.use(config => {
  const accessToken = getToken().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const data = error.response?.data;
    const status = error.response?.status || 500;

    // Handle 401 unauthorized errors (expired token)
    if (status === 401 && !originalRequest._retry && !originalRequest.url?.includes("/auth/refresh")) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Try to refresh the token
        const response = await axiosInstance.post("/auth/refresh");
        const newToken = response.data.accessToken;

        if (newToken) {
          setToken(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          processQueue(null, newToken);
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Refresh failed - clear auth state and redirect to login
        revokeToken();
        clearProfile();

        // Redirect to login if not already there
        if (!window.location.pathname.includes("/auth/")) {
          window.location.href = "/auth/login";
        }

        return Promise.reject({
          status: 401,
          message: "Session expired. Please login again.",
        });
      } finally {
        isRefreshing = false;
      }
    }

    // Handle rate limit (429) errors
    if (status === 429 && data) {
      const blockedUntilTimestamp =
        typeof data.blockedUntil === "string" ? new Date(data.blockedUntil).getTime() : data.blockedUntil;

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
  },
);

export default axiosInstance;
