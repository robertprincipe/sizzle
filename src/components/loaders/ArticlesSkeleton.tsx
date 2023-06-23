import { Skeleton } from "../ui/skeleton";

const ArticlesSkeleton = () => {
  return (
    <div className="grid gap-10 mt-6 sm:grid-cols-2">
      {[1, 2].map((p) => (
        <article key={p} className="overflow-hidden group rounded-xl">
          <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
            <Skeleton className="absolute top-0 left-0 w-full h-full rounded-lg bg-muted dark:bg-dark" />
          </div>
          <Skeleton className="h-8 rounded-xl bg-muted dark:bg-dark mt-2" />
          <div className="grid grid-cols-3 gap-3 w-[60%] h-full">
            {[1, 2, 3].map((n) => (
              <Skeleton
                key={n}
                className="h-4 w-15 rounded-xl bg-muted dark:bg-dark mt-2"
              />
            ))}
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticlesSkeleton;
