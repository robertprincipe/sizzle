import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Main from "@/components/layouts/Main";
import BlogPage from "@/pages/Blog/BlogPage";
import { ProtectedRoute } from "./shared/ProtectedRoutes";
import HomePage from "@/pages/home-page";
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
const ContactPage = LazyLoading(lazy(() => import("@/pages/contact-page")));
const PricingPage = LazyLoading(lazy(() => import("@/pages/pricing-page")));

const EditPostPage = LazyLoading(
  lazy(() => import("@/pages/Blog/EditPostPage"))
);

const PostPage = LazyLoading(lazy(() => import("@/pages/Blog/post-page")));

const ConfigProfilePage = LazyLoading(
  lazy(() => import("@/pages/Admin/ConfigProfilePage"))
);
const ActivatePage = LazyLoading(
  lazy(() => import("@/pages/Auth/ActivatePage"))
);
const NotFoundPage = LazyLoading(lazy(() => import("@/pages/NotFoundPage")));
