import { Suspense, lazy } from "react";
import { RouteObject } from "react-router-dom";

import Main from "@/components/layouts/Main";

import BlogPage from "@/pages/Blog/IndexPage";

import PostPage from "@/pages/Blog/PostPage";

import { ProtectedRoute } from "./shared/ProtectedRoutes";
import HomePage from "@/pages/HomePage";
import EditPostPage from "@/pages/Blog/EditPostPage";

// const EditPostPage = lazy(() => import("@/pages/Blog/EditPostPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));

const ContactPage = lazy(() => import("@/pages/ContactPage"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));

const ConfigProfilePage = lazy(() => import("@/pages/Admin/ConfigProfilePage"));

const ActivatePage = lazy(() => import("@/pages/Auth/ActivatePage"));

const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const MainRoutesList: RouteObject[] = [
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "", element: <Suspense children={<HomePage />} /> },
      { path: "blog", element: <BlogPage /> },
      { path: "post/:slug", element: <Suspense children={<PostPage />} /> },
      {
        path: "",
        element: <ProtectedRoute redirectTo="/login" />,
        children: [
          {
            path: "post/:id/edit",
            element: <EditPostPage />,
          },
          {
            path: "config",
            element: <Suspense children={<ConfigProfilePage />} />,
          },
        ],
      },
      { path: "@/:username", element: <Suspense children={<ProfilePage />} /> },
      { path: "contact", element: <Suspense children={<ContactPage />} /> },
      { path: "pricing", element: <Suspense children={<PricingPage />} /> },
      {
        path: "activate/:uid/:token",
        element: <Suspense children={<ActivatePage />} />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default MainRoutesList;
