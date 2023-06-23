import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Main from "@/components/layouts/Main";
import BlogPage from "@/pages/Blog/BlogPage";
import { ProtectedRoute } from "./shared/ProtectedRoutes";
import HomePage from "@/pages/HomePage";
import TagPage from "@/pages/TagPage";

const AdminRoutesList = (): RouteObject[] => [
  {
    path: "/admin/",
    element: <AdminLayout />,
    children: [
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
];

export default AdminRoutesList;

const EditorPostsPage = LazyLoading(
  lazy(() => import("@/pages/Admin/EditorPostsPage"))
);
const OverViewPage = LazyLoading(
  lazy(() => import("@/pages/Admin/OverviewPage"))
);
import NotificationsPage from "@/pages/Admin/NotificationsPage";
import LazyLoading from "./HOC/LazyLoading";
const AdminLayout = LazyLoading(lazy(() => import("./layouts/Admin")));

const EditPostPage = LazyLoading(
  lazy(() => import("@/pages/Blog/EditPostPage"))
);

const ConfigProfilePage = LazyLoading(
  lazy(() => import("@/pages/Admin/ConfigProfilePage"))
);
