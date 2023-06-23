import ArticlesSkeleton from "@/components/loaders/ArticlesSkeleton";
import { toastError } from "@/lib/errors";
import { tagDetail } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

const TagPage = () => {
  const { name } = useParams();
  const { data: tag, isLoading } = useQuery(["tagDetail", name], () =>
    tagDetail(name || "")
  );
  return (
    <section className="container max-w-4xl mx-auto ">
      <div
        className={`flex flex-col mt-5 relative shadow-lg dark:shadow-md dark:shadow-dark rounded-2xl overflow-hidden`}
      >
        <div className="flex items-center space-x-4">
          <img
            src="https://cdn.midjourney.com/704e45be-ee8e-4043-aba2-0887105a2885/0_3_640_N.webp"
            alt=""
            className="h-52"
          />
          <div>
            <h1 className="mb-3 text-4xl font-black">#{tag?.name}</h1>
            <p className="font-medium text-muted">{tag?.description}</p>
          </div>
        </div>

        <div className="w-full h-4" style={{ backgroundColor: tag?.color }} />
      </div>

      <div className="max-w-4xl py-6">
        <h2 className="text-3xl font-bold text-center">Publicaciones</h2>
        {isLoading ? (
          <ArticlesSkeleton />
        ) : (
          <>
            {tag?.posts?.length ? (
              <div className="grid gap-10 mt-6 sm:grid-cols-2">
                {tag?.posts?.map((post) => (
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
                      {/* <span className="absolute top-0 right-0 rounded-tr-xl rounded-bl-xl text-xs font-medium bg-dark text-light py-1.5 px-3 dark:bg-indigo-500">
                    Sponsored
                  </span> */}
                    </div>

                    <div className="mt-2">
                      <h3 className="text-2xl font-bold text-dark group-hover:text-dark dark:text-muted">
                        {post.title}
                      </h3>
                      {post.tags && (
                        <div className="space-x-2">
                          {post.tags.map((tag) => (
                            <span
                              className="mt-2 text-sm text-blue-500"
                              key={tag.name}
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
    </section>
  );
};

export default TagPage;
