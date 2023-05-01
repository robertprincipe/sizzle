import { Suspense, lazy } from "react";
import { RouteObject } from "react-router-dom";

import AuthLayout from "./layouts/Auth";
import { UserLogged } from "./shared/ProtectedRoutes";
const ResendActivation = lazy(() => import("@/pages/Auth/ResendActivation"));
const ResetPassword = lazy(() => import("@/pages/Auth/ResetPassword"));
const ResetPasswordConfirm = lazy(
  () => import("@/pages/Auth/ResetPasswordConfirm")
);

const LoginPage = lazy(() => import("@/pages/Auth/LoginPage"));
const SignUpPage = lazy(() => import("@/pages/Auth/SignUpPage"));

const AuthRoutesList: RouteObject[] = [
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
            element: <Suspense children={<LoginPage />} />,
          },
          {
            path: "signup",
            element: <Suspense children={<SignUpPage />} />,
          },
          {
            path: "resend-activation",
            element: <Suspense children={<ResendActivation />} />,
          },
          {
            path: "forgot-password",
            element: <Suspense children={<ResetPassword />} />,
          },
        ],
      },
      {
        path: "forgot-password-confirm",
        element: <Suspense children={<ResetPasswordConfirm />} />,
      },
    ],
  },
];

export default AuthRoutesList;
