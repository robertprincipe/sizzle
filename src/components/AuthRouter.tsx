import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import AuthLayout from "./layouts/Auth";
import { UserLogged } from "./shared/ProtectedRoutes";
import LazyLoading from "./HOC/LazyLoading";

const AuthRoutesList = (): RouteObject[] => [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <UserLogged />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "signup",
            element: <SignUpPage />,
          },
          {
            path: "resend-activation",
            element: <ResendActivation />,
          },
          {
            path: "forgot-password",
            element: <ResetPassword />,
          },
        ],
      },
      {
        path: "forgot-password-confirm",
        element: <ResetPasswordConfirm />,
      },
    ],
  },
];

export default AuthRoutesList;

const LoginPage = LazyLoading(lazy(() => import("@/pages/Auth/LoginPage")));
const SignUpPage = LazyLoading(lazy(() => import("@/pages/Auth/SignUpPage")));
const ResendActivation = LazyLoading(
  lazy(() => import("@/pages/Auth/ResendActivation"))
);
const ResetPassword = LazyLoading(
  lazy(() => import("@/pages/Auth/ResetPassword"))
);
const ResetPasswordConfirm = LazyLoading(
  lazy(() => import("@/pages/Auth/ResetPasswordConfirm"))
);
