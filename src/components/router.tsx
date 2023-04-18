import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Main from "@/components/layouts/Main";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/HomePage"));
const BlogPage = lazy(() => import("@/pages/Blog/IndexPage"));
const PostPage = lazy(() => import("@/pages/Blog/PostPage"));
const CreatePostPage = lazy(() => import("@/pages/Blog/CreatePostPage"));
const LoginPage = lazy(() => import("@/pages/Auth/LoginPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));

const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Main />}>
        <Route
          path=""
          element={
            <Suspense>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="blog"
          element={
            <Suspense
              fallback={
                <div className="sticky inset-0 w-screen h-screen bg-red-200">
                  loading
                </div>
              }
            >
              <BlogPage />
            </Suspense>
          }
        />
        <Route
          path="post/:slug"
          element={
            <Suspense>
              <PostPage />
            </Suspense>
          }
        />
        <Route
          path="post/create"
          element={
            <Suspense>
              <CreatePostPage />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense>
              <ContactPage />
            </Suspense>
          }
        />

        <Route
          path="pricing"
          element={
            <Suspense>
              <PricingPage />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/login"
        element={
          <Suspense>
            <LoginPage />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

export default router;
