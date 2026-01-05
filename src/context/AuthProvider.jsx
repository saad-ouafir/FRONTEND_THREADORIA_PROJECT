import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext.js";
import axiosInstance, {
  setAccessToken as setAxiosToken,
} from "../api/axiosInstance.js";

// Provider component
export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync token with axios instance whenever it changes
  useEffect(() => {
    setAxiosToken(accessToken);
  }, [accessToken]);

  // On app load, try to get a new access token using refresh token cookie
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axiosInstance.post("/auth/refresh");
        setAccessToken(response.data.accessToken || null);
      } catch {
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessToken();
  }, []);

  // Login - save token in memory
  const login = (token, userData) => {
    setAccessToken(token);
    setUser(userData);
  };

  // Logout - clear memory + call API to clear cookie
  const logout = async () => {
    await axiosInstance.post("/auth/logout").catch(error => {
      console.error(error);
    });
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        loading,
        login,
        logout,
        isAuthenticated: accessToken,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
}
