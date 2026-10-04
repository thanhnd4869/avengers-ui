import { createBrowserRouter, Navigate } from "react-router";

import { GuestOnly, RequireAdmin } from "@components/AuthGuard";
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
        element: <GuestOnly />,
        children: [
          {
            path: PATHS.LOGIN,
            lazy: () => import("@pages/LoginPage"),
          },
          {
            path: PATHS.REGISTER,
            lazy: () => import("@pages/RegisterPage"),
          },
          {
            path: PATHS.FORGOT_PASSWORD,
            lazy: () => import("@pages/ForgotPasswordPage"),
          },
        ],
      },
      {
        path: PATHS.RESET_PASSWORD,
        lazy: () => import("@pages/ResetPasswordPage"),
      },
      {
        path: PATHS.VERIFY_EMAIL,
        lazy: () => import("@pages/VerifyEmailPage"),
      },
      {
        element: <RequireAdmin />,
        children: [
          {
            path: PATHS.ADMIN,
            element: <Navigate to={PATHS.ADMIN_CONTACT_MESSAGES} replace />,
          },
          {
            path: PATHS.ADMIN_CONTACT_MESSAGES,
            lazy: () => import("@pages/AdminContactMessagesPage"),
          },
        ],
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
