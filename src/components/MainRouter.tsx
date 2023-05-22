import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Main from "@/components/layouts/Main";
import BlogPage from "@/pages/Blog/IndexPage";
import PostPage from "@/pages/Blog/PostPage";
import { ProtectedRoute } from "./shared/ProtectedRoutes";
import HomePage from "@/pages/HomePage";
import EditPostPage from "@/pages/Blog/EditPostPage";
import TagPage from "@/pages/TagPage";

const MainRoutesList = (): RouteObject[] => [
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "post/:slug", element: <PostPage /> },
      { path: "tag/:name", element: <TagPage /> },
      {
        path: "",
        element: <ProtectedRoute redirectTo="/auth/login" />,
        children: [
          {
            path: "post/:id/edit",
            element: <EditPostPage />,
          },
          {
            path: "config",
            element: <ConfigProfilePage />,
          },

          {
            path: "/dashboard/",
            element: <AdminLayout />,
            children: [
              {
                path: "",
                element: <OverViewPage />,
              },
              {
                path: "posts",
                element: <EditorPostsPage />,
              },
              {
                path: "notifications",
                element: <NotificationsPage />,
              },
            ],
          },
        ],
      },
      { path: "@/:username", element: <ProfilePage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "pricing", element: <PricingPage /> },
      {
        path: "activate/:uid/:token",
        element: <ActivatePage />,
      },
    ],
  },
  {
    path: "not-found",
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default MainRoutesList;

const EditorPostsPage = LazyLoading(
  lazy(() => import("@/pages/Admin/EditorPostsPage"))
);
const OverViewPage = LazyLoading(
  lazy(() => import("@/pages/Admin/OverviewPage"))
);
import NotificationsPage from "@/pages/Admin/NotificationsPage";
import LazyLoading from "./HOC/LazyLoading";
const AdminLayout = LazyLoading(lazy(() => import("./layouts/Admin")));
const ProfilePage = LazyLoading(lazy(() => import("@/pages/ProfilePage")));
const ContactPage = LazyLoading(lazy(() => import("@/pages/ContactPage")));
const PricingPage = LazyLoading(lazy(() => import("@/pages/PricingPage")));

const ConfigProfilePage = LazyLoading(
  lazy(() => import("@/pages/Admin/ConfigProfilePage"))
);
const ActivatePage = LazyLoading(
  lazy(() => import("@/pages/Auth/ActivatePage"))
);
const NotFoundPage = LazyLoading(lazy(() => import("@/pages/NotFoundPage")));
