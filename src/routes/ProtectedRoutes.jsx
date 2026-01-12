import { useLayoutEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import getToken from "../utils/auth/getToken";
import setToken from "../utils/auth/setToken";
import setProfile from "../utils/profile/setProfile";
import { refreshToken } from "../api/auth.api";

export default function ProtectedRoutes({ children }) {
  const [status, setStatus] = useState("loading");

  useLayoutEffect(() => {
    const checkAuth = async () => {
      if (getToken()) {
        setStatus("authenticated");
        return;
      }

      try {
        const result = await refreshToken();
        if (result.accessToken) {
          setToken(result.accessToken);
          setProfile(result.user);
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
