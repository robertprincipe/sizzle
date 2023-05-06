import { fromNow } from "@/lib/date";
import { postDetail } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";

import { Link, useNavigate, useParams } from "react-router-dom";

import Head from "@/components/shared/Head";

import Comments from "@/components/organisms/Comments";
import { Button } from "@/components/ui/button";
import Owner from "@/components/shared/Owner";

import PostSkeleton from "@/components/loaders/PostSkeleton";
import { Suspense, lazy } from "react";
import ActionsPost from "@/components/molecules/ActionsPost";
import ContentPostSkeleton from "@/components/loaders/ContentPostSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { TOC } from "@/components/TOC";
const ContentPost = lazy(() => import("@/components/molecules/ContentPost"));

export default function PostPage() {
  const { slug } = useParams();
  const router = useNavigate();
  const { data, isLoading } = useQuery(
    ["postDetail", slug],
    () => postDetail(slug || ""),
    {
      retry: false,
      onError: () => {
        router("/404");
      },
    }
  );

  return (
    <>
      {isLoading && !data ? (
        <PostSkeleton />
      ) : (
        <>
          <Head title={data?.data.title || ""} />
          <section className="container relative max-w-5xl py-6 lg:py-10">
            <div className="relative flex flex-col gap-4 lg:flex-row">
              <div className="order-2 col-start-1 col-end-6 lg:order-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                    <div className="flex-shrink-0">
                      <Avatar className="w-6 h-6">
                        <AvatarImage
                          src={data?.data.author?.picture as string as string}
                          alt={`@${data?.data.author?.username}`}
                        />
                        <AvatarFallback>
                          {data?.data.author?.username
                            .split(" ")
                            .map((part: string) =>
                              part.charAt(0).toUpperCase()
                            )}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="grow">
                      <div className="grid gap-2 sm:flex sm:justify-between sm:items-center">
                        <div>
                          <div className="hs-tooltip inline-block [--trigger:hover] [--placement:bottom]">
                            <div className="block text-left cursor-pointer hs-tooltip-toggle sm:mb-1">
                              <span className="font-semibold text-gray-800 dark:text-gray-200">
                                {data?.data.author?.username}
                              </span>
                            </div>
                          </div>

                          <ul className="text-xs text-gray-500">
                            <li className="relative inline-block pr-6 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                              {fromNow(data?.data.created_at || new Date())}
                            </li>
                            <li className="relative inline-block pr-6 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                              {data?.data.reading_time === 0
                                ? 1
                                : data?.data.reading_time}{" "}
                              min
                            </li>
                          </ul>
                        </div>

                        <Owner authorId={data?.data.author?.id || ""}>
                          <Link
                            to={`/post/${data?.data.id}/edit`}
                            // className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-gray-600 transition-all bg-white border border-transparent rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                          >
                            <Button>Editar publicación</Button>
                          </Link>
                        </Owner>
                      </div>
                    </div>
                  </div>
                </div>
                <h1 className="inline-block mt-2 text-4xl font-extrabold leading-tight text-4 lg:text-5xl dark:text-white">
                  {data?.data.title}
                </h1>

                {data?.data.cover_image && (
                  <img
                    src={data?.data.cover_image as string}
                    alt={data?.data.title}
                    height={405}
                    className="mt-8 transition-colors rounded-md bg-slate-200 group-hover:border-slate-900"
                  />
                )}
                <div className="my-6 prose prose-cyan max-w-none dark:prose-invert">
                  <Suspense fallback={<ContentPostSkeleton />}>
                    <ContentPost content={data?.data.content} />
                  </Suspense>
                </div>
                <div className="mb-3">
                  {data?.data.tags &&
                    data?.data.tags.map((tag) => (
                      <Link
                        className="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
                        to={`/tag/${tag.name}`}
                        key={tag.id}
                      >
                        {tag.name}
                      </Link>
                    ))}
                </div>
              </div>
              <TOC selector=".prose" />
            </div>
            <Comments post={data?.data || {}} />
          </section>
        </>
      )}
      <ActionsPost
        post_id={data?.data.id}
        comment_count={data?.data.comment_count}
      />
    </>
  );
}
