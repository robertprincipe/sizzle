import { fromNow } from "@/lib/date";
import { postDetail } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import Head from "@/components/shared/Head";
import Comments from "@/components/organisms/Comments";
import { Button } from "@/components/ui/button";
import Owner from "@/components/shared/Owner";
import PostSkeleton from "@/components/loaders/PostSkeleton";
import { Suspense, lazy } from "react";
import ActionsPost from "@/components/molecules/ActionsPost";
import ContentPostSkeleton from "@/components/loaders/ContentPostSkeleton";
import { TOC } from "@/components/TOC";
import ReactionPost from "@/components/molecules/ReactionsPost";
import { getContrastColor1 } from "@/lib/colors";
import { Input } from "@/components/ui/input";
const ContentPost = lazy(() => import("@/components/molecules/ContentPost"));

export default function PostPage() {
  const { slug } = useParams();
  const router = useNavigate();
  const { data: post, isLoading } = useQuery(
    ["postDetail", slug],
    () => postDetail(slug || ""),
    {
      retry: false,
      onError: () => {
        router("/404");
      },
      onSuccess: (data) => {},
    }
  );

  return (
    <>
      <Head title={post?.title || ""} />
      <section className="container py-6 max-w-7xl lg:py-10">
        <div className="relative">
          <div className="flex flex-col gap-4 lg:flex-row">
            <ReactionPost postId={post?.id || ""} />
            <div className="order-2">
              {isLoading && !post ? (
                <PostSkeleton />
              ) : (
                <>
                  <div className="flex items-center justify-between w-full mb-6 gap-x-5 sm:gap-x-3">
                    <div className="flex space-x-2 sm:items-center">
                      <Link
                        to={`/@/${post?.author?.username}`}
                        className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full"
                      >
                        <Avatar>
                          <AvatarImage
                            src={post?.author?.picture as string as string}
                            alt={`@${post?.author?.username}`}
                            className="object-cover w-10 h-10 overflow-hidden rounded-full"
                          />
                          <AvatarFallback>
                            {post?.author?.username
                              .split(" ")
                              .map((part: string) =>
                                part.charAt(0).toUpperCase()
                              )}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <div>
                        <div className="hs-tooltip inline-block [--trigger:hover] [--placement:bottom]">
                          <Link
                            to={`/@/${post?.author?.username}`}
                            className="block text-left cursor-pointer hs-tooltip-toggle sm:mb-1"
                          >
                            <span className="font-semibold text-dark dark:text-muted">
                              @{post?.author?.username}
                            </span>
                          </Link>
                        </div>

                        <ul className="text-xs text-muted">
                          <li className="relative inline-block pr-6 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-muted before:rounded-full dark:text-muted dark:before:bg-dark">
                            {fromNow(post?.created_at || new Date())}
                          </li>
                          <li className="relative inline-block pr-6 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-muted before:rounded-full dark:text-muted dark:before:bg-dark">
                            {post?.reading_time === 0 ? 1 : post?.reading_time}{" "}
                            min
                          </li>
                        </ul>
                      </div>
                    </div>

                    <Owner authorId={post?.author?.id || ""}>
                      <Link
                        to={`/admin/post/${post?.id}/edit`}
                        // className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-all bg-white border border-transparent rounded-md text-dark hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-dark"
                      >
                        <Button>Editar publicación</Button>
                      </Link>
                    </Owner>
                  </div>
                  <h1 className="inline-block mt-2 text-4xl font-extrabold leading-tight text-4 lg:text-5xl dark:text-light">
                    {post?.title}
                  </h1>

                  {post?.cover_image && (
                    <img
                      src={post?.cover_image as string}
                      alt={post?.title}
                      height={405}
                      className="w-full mt-8 transition-colors rounded-md bg-muted group-hover:border-dark"
                    />
                  )}
                  <div className="my-3">
                    {post?.tags &&
                      post?.tags.map((tag) => (
                        <Link
                          className="m-1 inline-flex items-center gap-0.5 py-2 px-3 rounded-full text-sm bg-muted hover:bg-muted dark:bg-dark dark:hover:bg-dark dark:text-muted font-semibold"
                          to={`/tag/${tag.name}`}
                          key={tag.id}
                          style={{
                            color: tag.color,
                            backgroundColor: getContrastColor1(
                              tag.color ? tag.color : "#fff"
                            ),
                          }}
                        >
                          <span>#</span>
                          {tag.name}
                        </Link>
                      ))}
                  </div>
                  <div className="prose prose-h2:mt-0 prose-h3:mt-0 prose-cyan max-w-none dark:prose-invert">
                    <Suspense fallback={<ContentPostSkeleton />}>
                      <ContentPost content={post?.content} />
                    </Suspense>
                  </div>
                </>
              )}
            </div>
            <div className="order-1 text-sm xl:block lg:order-3">
              <div className="sticky pt-5 -mt-10 top-16 lg:w-72">
                {post && <TOC selector=".prose" />}
                <div className="flex flex-col bg-[#0b102a] text-light shadow-sm rounded-xl p-4 md:p-5">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    Stay in the loop
                  </h3>
                  <p className="mt-1">
                    Get free expert insights and tips to grow your knowledge
                    business sent right to your inbox.
                  </p>

                  <form className="mt-3 text-xs font-medium">
                    <div className="flex flex-col space-y-2">
                      <Input placeholder="ej: make@gmail.com" />
                      <Button variant="link">Uneté al newsletter</Button>
                    </div>
                  </form>
                  <p className="mt-2 text-gray-800 dark:text-gray-400">
                    By submitting you agree to receive our monthly Knowledge
                    Economy Newsletter as well as other promotional emails from
                    Kajabi. You may withdraw your consent at any time via the
                    “Unsubscribe” link in any email or view our privacy policy
                    at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ActionsPost
            post_id={post?.id}
            comment_count={post?.comment_count}
            reaction_count={post?.reaction_count}
          />
        </div>
        {post && <Comments post={post} />}
      </section>
    </>
  );
}
