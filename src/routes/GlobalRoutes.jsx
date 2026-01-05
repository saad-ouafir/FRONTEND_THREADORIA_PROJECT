import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../hooks/api/useAuth";

import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Notifications from "../pages/Notifications";
import NewThread from "../pages/NewThread";
import RateLimitBlocked from "../pages/RateLimitBlocked";

import IndexLayout from "../layouts/IndexLayout";
import MainLayout from "../layouts/MainLayout";
import ThreadsLayout from "../layouts/ThreadsLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import SettingsLayout from "../layouts/SettingsLayout";

// Simple protected route wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
}

// Redirect if already logged in
function GuestRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? <Navigate to="/home" replace /> : children;
}

export default function GlobalRoutes() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <IndexLayout />,
      children: [
        { index: true, element: <Index /> },
        { path: "blocked", element: <RateLimitBlocked /> },
        { path: "*", element: <NotFound /> },
        {
          path: "auth",
          children: [
            {
              path: "login",
              element: (
                <GuestRoute>
                  <Login />
                </GuestRoute>
              ),
            },
            {
              path: "register",
              element: (
                <GuestRoute>
                  <Register />
                </GuestRoute>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <ThreadsLayout />
            </ProtectedRoute>
          ),
        },
        {
          path: "new-thread",
          element: (
            <ProtectedRoute>
              <NewThread />
            </ProtectedRoute>
          ),
        },
        {
          path: "notifications",
          element: (
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          ),
        },
        {
          path: "settings",
          element: (
            <ProtectedRoute>
              <SettingsLayout />
            </ProtectedRoute>
          ),
        },
        { path: "profile", element: <Profile /> },
        { path: "profile/:username", element: <Profile /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
