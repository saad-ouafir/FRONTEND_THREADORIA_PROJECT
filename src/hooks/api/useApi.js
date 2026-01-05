import axios from "axios";
import { useMemo } from "react";
import { useAuth } from "./useAuth.js";
import API_URL from "../../config/config.js";

// Hook that returns an axios instance with auth token attached
export const useApi = () => {
  const { accessToken } = useAuth();

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: API_URL,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    instance.interceptors.request.use(config => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    return instance;
  }, [accessToken]);

  return api;
};
