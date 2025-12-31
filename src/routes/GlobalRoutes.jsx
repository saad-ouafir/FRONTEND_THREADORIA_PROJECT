import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";

import IndexLayout from "../layouts/IndexLayout";
import MainLayout from "../layouts/MainLayout";
import ThreadsLayout from "../layouts/ThreadsLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import SettingsLayout from "../layouts/SettingsLayout";
export default function PublicRoutes() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <IndexLayout />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "auth",
          children: [
            {
              index: true,
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
          // index: true,
          path: "home",
          element: <ThreadsLayout />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "profile/:username",
          element: <Profile />,
        },
        {
          path: "settings",
          element: <SettingsLayout />,
        },
        
        
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
