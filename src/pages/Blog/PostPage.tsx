import { fromNow } from "@/lib/date";
import { postDetail } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";

import { Link, useParams } from "react-router-dom";

import Head from "@/components/shared/Head";

import Comments from "@/components/organisms/Comments";
import { Button } from "@/components/ui/button";
import Owner from "@/components/shared/Owner";

import PostSkeleton from "@/components/loaders/PostSkeleton";
import { Suspense, lazy } from "react";
import ActionsPost from "@/components/molecules/ActionsPost";
import ContentPostSkeleton from "@/components/loaders/ContentPostSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
const ContentPost = lazy(() => import("@/components/molecules/ContentPost"));

export default function PostPage() {
  const { slug } = useParams();
  // const user = useAuthStore((state) => state.user);
  const { data, isLoading } = useQuery(["postDetail"], () =>
    postDetail(slug || "")
  );

  return (
    <>
      {isLoading ? (
        <PostSkeleton />
      ) : (
        <>
          <section className="container relative max-w-3xl py-6 lg:py-10">
            <Head title={data?.data.title || ""} />
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
                        .map((part: string) => part.charAt(0).toUpperCase())}
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
                          {fromNow(data?.data.created_at as Date)}
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
                        // className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-white text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
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

            <img
              src={data?.data.cover_image as string}
              alt={data?.data.title}
              width={720}
              height={405}
              className="mt-8 transition-colors rounded-md bg-slate-200 group-hover:border-slate-900"
            />

            <Suspense fallback={<ContentPostSkeleton />}>
              <ContentPost content={data?.data.content} />
            </Suspense>
            <div className="mb-3">
              {data?.data.tags &&
                data?.data.tags.map((tag) => (
                  <Link
                    className="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
                    to="/"
                    key={tag.id}
                  >
                    {tag.name}
                  </Link>
                ))}
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
