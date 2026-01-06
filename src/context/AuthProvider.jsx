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

  // On app load, try to get user data from localStorage first, then refresh token
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Try to get data from localStorage first
        const storedToken = localStorage.getItem('accessToken');
        const storedUserData = localStorage.getItem('userData');
        
        if (storedToken && storedUserData) {
          setAccessToken(storedToken);
          setUser(JSON.parse(storedUserData));
          
          // Try to refresh the token to validate it
          const response = await axiosInstance.post("/auth/refresh");
          setAccessToken(response.data.accessToken || null);
          if (response.data.user) {
            setUser(response.data.user);
            localStorage.setItem('userData', JSON.stringify(response.data.user));
          }
        } else {
          // Fallback to refresh token only
          const response = await axiosInstance.post("/auth/refresh");
          setAccessToken(response.data.accessToken || null);
        }
      } catch {
        setAccessToken(null);
        setUser(null);
        // Clear invalid localStorage data
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userData');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login - save token and user data in memory and localStorage
  const login = (token, userData) => {
    setAccessToken(token);
    setUser(userData);
    // Store in localStorage
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  // Logout - clear memory + call API to clear cookie + localStorage
  const logout = async () => {
    await axiosInstance.post("/auth/logout").catch(error => {
      console.error(error);
    });
    setAccessToken(null);
    setUser(null);
    // Clear localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
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
