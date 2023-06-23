import { Skeleton } from "../ui/skeleton";

const PostSkeleton = () => {
  return (
    <section className="container relative max-w-3xl py-6 lg:py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
          <Skeleton className="w-12 h-12 rounded-full bg-dark dark:bg-muted" />

          <div className="grow">
            <div className="grid gap-2 sm:flex sm:justify-between sm:items-center">
              <div>
                <div className="hs-tooltip inline-block">
                  <Skeleton className="bg-dark dark:bg-muted w-40 h-4" />
                </div>

                <ul className="grid grid-cols-2 gap-1">
                  <Skeleton className="bg-dark dark:bg-muted w-20 h-2.5" />
                  <Skeleton className="bg-dark dark:bg-muted w-16 h-2.5" />
                </ul>
              </div>

              {/* <div></div> */}
            </div>
          </div>
        </div>
      </div>
      <Skeleton className="bg-slate-400 w-full h-8 lg:h-12 dark:bg-white" />

      <Skeleton className="mt-8 transition-colors rounded-md bg-slate-200 w-[720px] h-[405px]" />
      <div className="prose prose-cyan max-w-none dark:prose-invert my-6"></div>
    </section>
  );
};

export default PostSkeleton;
