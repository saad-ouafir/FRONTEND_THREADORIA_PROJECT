import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import NewThread from "../pages/NewThread";
import RateLimitBlocked from "../pages/RateLimitBlocked";

import IndexLayout from "../layouts/IndexLayout";
import MainLayout from "../layouts/MainLayout";
import HomeLayout from "../layouts/HomeLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import SettingsLayout from "../layouts/SettingsLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import SearchLayout from "../layouts/SearchLayout";
import NotificationsLayout from "../layouts/NotificationsLayout";

import Follows from "../components/Profile/Follows";
import ProfileThreads from "../components/Profile/ProfileThreads";

import ProtectedRoutes from "./ProtectedRoutes";
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
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
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
          element: <HomeLayout />,
        },
        {
          path: "new-thread",
          element: (
            <ProtectedRoutes>
              <NewThread />
            </ProtectedRoutes>
          ),
        },
        {
          path: "notifications",
          element: (
            <ProtectedRoutes>
              <NotificationsLayout />
            </ProtectedRoutes>
          ),
        },
        {
          path: "settings",
          element: (
            <ProtectedRoutes>
              <SettingsLayout />
            </ProtectedRoutes>
          ),
        },
        {
          path: "profile/:id",
          element: (
            <ProtectedRoutes>
              <ProfileLayout />
            </ProtectedRoutes>
          ),
          children: [
            {
              path: "followers",
              element: <Follows opt="followers" />,
            },
            {
              path: "followings",
              element: <Follows opt="following" />,
            },
          ],
        },
        {
          path: "profile",
          element: (
            <ProtectedRoutes>
              <ProfileLayout />
            </ProtectedRoutes>
          ),
          children: [
            {
              index: true,
              element: <ProfileThreads />,
            },
            {
              path: "followers",
              element: <Follows opt="followers" />,
            },
            {
              path: "followings",
              element: <Follows opt="following" />,
            },
          ],
        },
        { path: "search", element: <SearchLayout /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
