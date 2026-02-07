// -----------------------------------
// Protected routes to be applied to the Global routes
// -----------------------------------

import { useLayoutEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import getToken from "../utils/auth/getToken";
import { refreshToken } from "../api/auth.api";

export default function ProtectedRoutes({ children }) {
  const [status, setStatus] = useState("loading");

  useLayoutEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const auth = getToken();
      if (auth !== null && auth.valid_until > Date.now()) {
        setStatus("authenticated");
        return;
      }

      // If not authenticated, try to refresh token
      try {
        const result = await refreshToken();
        if (result.status === 200) {
          setStatus("authenticated");
        } else {
          setStatus("unauthenticated");
        }
      } catch (err) {
        console.error(err);
        setStatus("unauthenticated");
      }
    };

    checkAuth();
  }, []);

  if (status === "loading") return null;
  if (status === "unauthenticated") return <Navigate to="/auth/login" replace />;
  if (status === "authenticated") return children;
  // return children;
}
