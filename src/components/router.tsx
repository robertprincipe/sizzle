import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Main from "@/components/layouts/Main";
import { Suspense, lazy } from "react";
import { ProtectedRoute } from "./shared/ProtectedRoutes";
import { useAuthStore } from "@/store/auth";

const HomePage = lazy(() => import("@/pages/HomePage"));
const BlogPage = lazy(() => import("@/pages/Blog/IndexPage"));
const PostPage = lazy(() => import("@/pages/Blog/PostPage"));
const CreatePostPage = lazy(() => import("@/pages/Blog/CreatePostPage"));
const LoginPage = lazy(() => import("@/pages/Auth/LoginPage"));
const SignUpPage = lazy(() => import("@/pages/Auth/SignUpPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));

const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

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
      </Route>
      <Route path="login" element={<Suspense children={<LoginPage />} />} />
      <Route path="signup" element={<Suspense children={<SignUpPage />} />} />
      <Route path=":slug" element={<Suspense children={<PostPage />} />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  );
};

const router = createBrowserRouter(createRoutesFromElements(RoutesList()));

export default router;
