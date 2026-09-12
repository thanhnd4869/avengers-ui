import { createBrowserRouter, Navigate } from "react-router";

import Layout from "@components/Layout";
import PageLoader from "@components/PageLoader";

import { PATHS } from "./paths";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    HydrateFallback: PageLoader,
    children: [
      {
        path: PATHS.HOME,
        lazy: () => import("@pages/HomePage"),
      },
      {
        path: PATHS.NOT_FOUND,
        lazy: () => import("@pages/NotFoundPage"),
      },
      // Any unknown URL lands on the dedicated not-found route.
      { path: "*", element: <Navigate to={PATHS.NOT_FOUND} replace /> },
    ],
  },
]);
