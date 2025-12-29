import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";

import IndexLayout from "../layouts/IndexLayout";
import MainLayout from "../layouts/MainLayout";
import ThreadsLayout from "../layouts/ThreadsLayout";

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
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
