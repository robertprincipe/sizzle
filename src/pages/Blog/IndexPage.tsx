import Head from "@/components/shared/Head";
import { fromNow } from "@/lib/date";
import { allPosts } from "@/services/post";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function BlogPage() {
  const { data: posts, isLoading } = useQuery(["allPosts"], allPosts);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <Head title="Publicaciones | make" />
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
            Publicaciones
          </h1>
          <p className="text-xl text-slate-600">
            Revisa las tutoriales, tips, hacks.
          </p>
        </div>
      </div>
      <div className="grid gap-10 sm:grid-cols-2">
        {posts?.data.map((post) => (
          <article
            key={post.id}
            className="relative flex flex-col space-y-2 group"
          >
            {post.cover_image && (
              <img
                src={post.cover_image as string}
                alt={post.title}
                width={804}
                height={452}
                className="transition-colors border rounded-md border-slate-200 bg-slate-200 group-hover:border-slate-900"
              />
            )}
            <h2 className="text-2xl font-extrabold">{post.title}</h2>
            {post.content && <p className="text-slate-600">{post.content}</p>}
            {post.created_at && (
              <p className="text-sm text-slate-600">
                {fromNow(post.created_at)}
              </p>
            )}
            <Link
              to={`/post/${post?.slug as string}`}
              className="absolute inset-0"
            >
              <span className="sr-only">View Article</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
