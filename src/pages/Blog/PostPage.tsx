import { fromNow } from "@/lib/date";
import { postDetail } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";

import { Link, useNavigate, useParams } from "react-router-dom";

import Head from "@/components/shared/Head";

// import tinycolor from "tinycolor2";

import Comments from "@/components/organisms/Comments";
import { Button } from "@/components/ui/button";
import Owner from "@/components/shared/Owner";

import PostSkeleton from "@/components/loaders/PostSkeleton";
import { Suspense, lazy } from "react";
import ActionsPost from "@/components/molecules/ActionsPost";
import ContentPostSkeleton from "@/components/loaders/ContentPostSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { TOC } from "@/components/TOC";
import ContentPost from "@/components/molecules/ContentPost";
import ReactionPost from "@/components/molecules/ReactionsPost";
// const ContentPost = lazy(() => import("@/components/molecules/ContentPost"));

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

  const getContrastColor1 = (color: string): string => {
    // Convierte el color a sus componentes RGB
    const [r, g, b] =
      color
        .slice(1)
        .match(/.{1,2}/g)
        ?.map((c) => parseInt(c, 16)) || [];

    // Calcula la luminosidad del color
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Decide si el color es claro o oscuro basándose en su luminosidad
    const isLight = luminance > 128;

    // Si el color es saturado, genera un tono más claro o más oscuro
    const saturation = Math.max(r, g, b) - Math.min(r, g, b);
    if (saturation > 64) {
      const factor = isLight ? -0.2 : 0.2;
      const [newR, newG, newB] = [r, g, b].map((c) =>
        Math.round(Math.min(Math.max(0, c + c * factor), 255))
      );

      console.log(
        `#${newR.toString(16)}${newG.toString(16)}${newB.toString(16)}`
      );

      return `#${newR.toString(16)}${newG.toString(16)}${newB.toString(16)}`;
    }

    // Si el color es poco saturado, genera un tono oscuro
    const [newR, newG, newB] = [r, g, b].map((c) => Math.round(c * 0.5));
    console.log(
      `#${newR.toString(16)}${newG.toString(16)}${newB.toString(16)}`
    );
    return `#${newR.toString(16)}${newG.toString(16)}${newB.toString(16)}`;
  };

  function getContrastColor(hexColor: string): string {
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luma < 128 ? "#fff" : "#000";
  }

  return (
    <>
      <Head title={post?.title || ""} />
      <section className="container py-6 max-w-7xl lg:py-10">
        <div className="relative">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* {post && <ReactionPost postId={post.id} />} */}
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
                            <span className="font-semibold text-gray-800 dark:text-gray-200">
                              @{post?.author?.username}
                            </span>
                          </Link>
                        </div>

                        <ul className="text-xs text-gray-500">
                          <li className="relative inline-block pr-6 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                            {fromNow(post?.created_at || new Date())}
                          </li>
                          <li className="relative inline-block pr-6 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                            {post?.reading_time === 0 ? 1 : post?.reading_time}{" "}
                            min
                          </li>
                        </ul>
                      </div>
                    </div>

                    <Owner authorId={post?.author?.id || ""}>
                      <Link
                        to={`/post/${post?.id}/edit`}
                        // className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-gray-600 transition-all bg-white border border-transparent rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                      >
                        <Button>Editar publicación</Button>
                      </Link>
                    </Owner>
                  </div>
                  <h1 className="inline-block mt-2 text-4xl font-extrabold leading-tight text-4 lg:text-5xl dark:text-white">
                    {post?.title}
                  </h1>

                  {post?.cover_image && (
                    <img
                      src={post?.cover_image as string}
                      alt={post?.title}
                      height={405}
                      className="mt-8 transition-colors rounded-md bg-slate-200 group-hover:border-slate-900"
                    />
                  )}
                  <div className="my-3">
                    {post?.tags &&
                      post?.tags.map((tag) => (
                        <Link
                          className="m-1 inline-flex items-center gap-0.5 py-2 px-3 rounded-full text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 font-semibold"
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
                    {/* <Suspense fallback={<ContentPostSkeleton />}>
                    
                  </Suspense> */}
                    <ContentPost content={post?.content} />
                  </div>
                </>
              )}
            </div>
            <div className="order-1 text-sm xl:block lg:order-3">
              <div className="sticky pt-5 -mt-10 overflow-y-auto top-16 lg:w-72">
                {post && <TOC selector=".prose" />}
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
