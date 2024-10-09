import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./shared/ProtectedRoutes";
import AdminLayout from "./layouts/Admin";

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
            path: "posts/:id/edit",
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
           {
            path: "account",
            element: <AccountPage />,
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
import AccountPage from "@/pages/Admin/account-page";

// const Main = LazyLoading(lazy(() => import("./layouts/Admin")));

const EditPostPage = LazyLoading(
  lazy(() => import("@/pages/Blog/EditPostPage"))
);

const ConfigProfilePage = LazyLoading(
  lazy(() => import("@/pages/Admin/ConfigProfilePage"))
);
