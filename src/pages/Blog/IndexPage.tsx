import ArticlesSkeleton from "@/components/loaders/ArticlesSkeleton";
import Head from "@/components/shared/Head";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { fromNow } from "@/lib/date";
import { toastError } from "@/lib/errors";
import { genId, makeSlug } from "@/lib/strings";
import { cn } from "@/lib/utils";
import { allPosts, postCreate } from "@/services/blog";
import { useAuthStore } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function BlogPage() {
  const { isAuthenticated } = useAuthStore((state) => state);
  const { data: posts, isLoading: isLoadingAllPosts } = useQuery(
    ["allPosts"],
    allPosts,
    {
      refetchOnWindowFocus: false,
    }
  );

  console.log(posts?.data.length);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useNavigate();

  const createPost = async () => {
    setIsLoading(true);
    try {
      const { data: post } = await postCreate({
        title: "Nueva publicacion",
        slug: `${makeSlug("Nueva publicacion", "-")}-${genId(5)}`,
      });

      setIsLoading(false);
      router(`/post/${post.id}/edit`);
    } catch (error) {
      toastError(error);
    }

    // This forces a cache invalidation.
  };

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <Head title="Publicaciones | Wariv" />
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold md:text-4xl md:leading-tight dark:text-white lg:text-4xl">
            Insights
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Revisa las tutoriales, tips, hacks.
          </p>
        </div>
        {isAuthenticated && (
          <Button
            onClick={createPost}
            className={cn({
              "cursor-not-allowed opacity-60": isLoading,
            })}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            Crear Publicación
          </Button>
        )}
      </div>
      {isLoadingAllPosts ? (
        <ArticlesSkeleton />
      ) : (
        <>
          {posts?.data && posts?.data.length > 0 ? (
            <div className="grid gap-10 mt-6 sm:grid-cols-2">
              {posts?.data.map((post) => (
                <Link
                  className="overflow-hidden group rounded-xl"
                  to={`/post/${post.slug}`}
                  key={post.id}
                >
                  <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
                    <img
                      className="absolute top-0 left-0 object-cover w-full h-full transition-transform duration-500 ease-in-out rounded-lg group-hover:scale-105"
                      src={post.cover_image as string}
                      alt="Image Description"
                    />
                    {/* <span className="absolute top-0 right-0 rounded-tr-xl rounded-bl-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-gray-900">
                    Sponsored
                  </span> */}
                  </div>

                  <div className="mt-2">
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-600 dark:text-gray-200">
                      {post.title}
                    </h3>
                    {post.tags && (
                      <div className="space-x-2">
                        {post.tags.map((tag) => (
                          <span
                            className="mt-2 text-sm text-blue-500"
                            key={tag.id}
                          >
                            #{tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex justify-center mt-4 text-lg font-semibold">
              No hay publicaciones
            </div>
          )}
        </>
      )}
    </div>
  );
}
