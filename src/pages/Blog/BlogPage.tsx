import ArticlesSkeleton from "@/components/loaders/ArticlesSkeleton";
import ButtonPostCreator from "@/components/shared/ButtonPostCreator";
import Head from "@/components/shared/Head";
import { formatDate, fromNow } from "@/lib/date";

import { allPosts } from "@/services/blog";
import { useAuthStore } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";
import { BookTemplate } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogPage() {
  const { isAuthenticated } = useAuthStore((state) => state);

  const { data: posts, isLoading } = useQuery(["allPosts"], allPosts);

  console.log(posts);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <Head title="Publicaciones | Wariv" />
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold md:text-4xl md:leading-tight dark:text-light lg:text-4xl">
            Insights
          </h1>
          <p className="mt-1 text-dark dark:text-muted">
            Revisa las tutoriales, tips, hacks.
          </p>
        </div>
        {isAuthenticated && <ButtonPostCreator />}
      </div>
      {isLoading ? (
        <ArticlesSkeleton />
      ) : (
        <>
          {posts && posts?.length > 0 ? (
            <div className="mt-6 columns-2">
              {posts?.map((post) => (
                <Link className="" to={`/post/${post.slug}`} key={post.id}>
                  <article className="relative mb-4 transition bg-center bg-cover rounded-[10px] overflow-hidden shadow hover:shadow-sm">
                    <img
                      src={(post.cover_image as string) || ""}
                      className="object-cover object-center w-full h-64"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-[#212931] text-light rounded-[10px] p-4 !pt-20 sm:p-6">
                      <time
                        // dateTime={post!.created_at}
                        className="block text-xs text-light"
                      >
                        {fromNow(post.created_at || new Date())}
                      </time>
                      <h3 className="mt-0.5 text-lg font-medium">
                        {post.title}
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-4">
                        {post.tags && (
                          <div className="space-x-2">
                            {post.tags.map((tag) => (
                              <span className="whitespace-nowrap rounded-full bg-[#5e89e586] px-2.5 py-0.5 text-xs font-semibold text-[#05277086]">
                                #{tag.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full mt-4 bg-muted border-2 border-muted dark:border-muted dark:bg-dark border-dashed rounded-lg min-h-[300px]">
              <div className="p-6 bg-white rounded-full dark:bg-muted">
                <BookTemplate className="w-20 h-20 dark:text-dark" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-dark dark:text-light">
                No hay publicaciones
              </h3>
              <p className="mt-2 mb-5 text-sm text-muted dark:text-muted">
                No se han hecho publicaciones todavia.
              </p>
              <ButtonPostCreator />
            </div>
          )}
        </>
      )}
    </div>
  );
}
