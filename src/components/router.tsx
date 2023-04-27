import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Main from "@/components/layouts/Main";
import { Suspense, lazy } from "react";
import { ProtectedRoute } from "./shared/ProtectedRoutes";
import { useAuthStore } from "@/store/auth";
import EditPostPage from "@/pages/Blog/EditPostPage";

const HomePage = lazy(() => import("@/pages/HomePage"));
const BlogPage = lazy(() => import("@/pages/Blog/IndexPage"));
const PostPage = lazy(() => import("@/pages/Blog/PostPage"));
const CreatePostPage = lazy(() => import("@/pages/Blog/CreatePostPage"));
const LoginPage = lazy(() => import("@/pages/Auth/LoginPage"));
const ActivatePage = lazy(() => import("@/pages/Auth/ActivatePage"));
const SignUpPage = lazy(() => import("@/pages/Auth/SignUpPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));

const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const ConfigProfilePage = lazy(() => import("@/pages/Admin/ConfigProfilePage"));

const RoutesList = () => {
  return (
    <>
      <Route path="/" element={<Main />}>
        <Route path="" element={<Suspense children={<HomePage />} />} />
        <Route
          path="blog"
          element={
            <Suspense
              fallback={
                <div className="sticky inset-0 w-screen h-screen bg-red-200" />
              }
              children={<BlogPage />}
            />
          }
        />
        <Route
          path="post/:slug"
          element={<Suspense children={<PostPage />} />}
        />
        <Route
          path="post/:slug/edit"
          element={<Suspense children={<EditPostPage />} />}
        />
        <Route path="" element={<ProtectedRoute redirectTo="/login" />}>
          <Route
            path="post/create"
            element={<Suspense children={<CreatePostPage />} />}
          />
        </Route>
        <Route
          path="contact"
          element={<Suspense children={<ContactPage />} />}
        />
        <Route
          path="pricing"
          element={<Suspense children={<PricingPage />} />}
        />
        <Route
          path="/config"
          element={<Suspense children={<ConfigProfilePage />} />}
        />
        <Route
          path="activate/:uid/:token"
          element={<Suspense children={<ActivatePage />} />}
        />
      </Route>
      <Route path="login" element={<Suspense children={<LoginPage />} />} />
      <Route path="signup" element={<Suspense children={<SignUpPage />} />} />

      <Route path="*" element={<NotFoundPage />} />
    </>
  );
};

const router = createBrowserRouter(createRoutesFromElements(RoutesList()));

export default router;
