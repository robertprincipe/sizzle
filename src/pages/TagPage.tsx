import ArticlesSkeleton from "@/components/loaders/ArticlesSkeleton";
import { fromNow } from "@/lib/date";
import { tagDetail } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

const TagPage = () => {
  const { name } = useParams();
  const { data: tag, isLoading } = useQuery(["tagDetail", name], () =>
    tagDetail(name || "")
  );
  return (
    <section className="container">
      {/* <div
        className={`flex flex-col mt-5 relative shadow-lg bg-card rounded-2xl overflow-hidden`}
      >
        <div className="flex items-center space-x-4">
          <img
            src="https://cdn.midjourney.com/704e45be-ee8e-4043-aba2-0887105a2885/0_3_640_N.webp"
            alt=""
            className="h-52"
          />
          <div>
            <h1 className="mb-3 text-4xl font-black font-mono">#{tag?.name}</h1>
            <p className="font-medium text-muted-foreground">
              {tag?.description}
            </p>
          </div>
        </div>

        <div className="w-full h-4" style={{ backgroundColor: tag?.color }} />
      </div> */}

      <div className="text-center">
        <h1 className="mb-3 text-5xl font-black font-mono mt-10">
          #{tag?.name}
        </h1>
        <p className="font-medium text-muted-foreground">{tag?.description}</p>
      </div>

      <div className="py-3">
        {isLoading ? (
          <ArticlesSkeleton />
        ) : (
          <>
            {tag?.posts?.length ? (
              <div className="grid gap-5 mt-6 sm:grid-cols-2">
                {tag?.posts?.map((post) => (
                  <article className="relative group border border-border p-10 rounded-2xl bg-card">
                    <Link
                      className="inset-0 block group-hover:scale-75 group-hover:-translate-y-16 z-50 transition-all duration-300 ease-in-out"
                      to={`/post/${post.slug}`}
                      key={post.id}
                    >
                      <img
                        src="https://pipe.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F141240%2F1400x840%2Fb2c8314c04%2Fhow-to-utilize-business-loans-for-expansion.png&w=1080&q=75"
                        alt=""
                      />
                    </Link>
                    <div className="absolute bottom-5 inset-x-10 opacity-0 group-hover:opacity-100 duration-300 translate-y-5 group-hover:translate-y-0 transition-all">
                      <div className="flex items-center gap-x-3 gap-y-1 flex-wrap">
                        <div className="text-xs text-medium text-muted-foreground">
                          <time>{fromNow(post.created_at || new Date())}</time>{" "}
                          — <span>{post.reading_time}min read</span>
                        </div>
                        <div className="flex gap-1.5 my-2">
                          {post.tags?.map((tag, idx) => (
                            <Link
                              key={tag.id}
                              to={`/tag/${tag.name}`}
                              className={`${
                                idx === 0
                                  ? "bg-card text-muted-foreground"
                                  : "bg-muted text-muted-foreground"
                              } text-xs rounded-full px-3 py-0.5 font-medium border border-zinc-300 dark:border-zinc-800 hover:underline`}
                            >
                              {tag.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <Link
                        className="inset-0 group-hover:scale-75 group-hover:-translate-y-16 z-50 transition-all duration-300 ease-in-out"
                        to={`/post/${post.slug}`}
                        key={post.id}
                      >
                        <h3 className="text-2xl font-bold">{post.title}</h3>
                      </Link>
                    </div>
                  </article>
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
