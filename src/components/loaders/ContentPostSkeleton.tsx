import { Skeleton } from "@/components/ui/skeleton";

const ContentPostSkeleton = () => {
  return (
    <div className="mt-[1.5rem]">
      <Skeleton className="h-8 mb-[1em] w-full bg-dark dark:bg-muted" />
      <Skeleton className="h-5 w-full mb-[1em] bg-muted dakr:bg-muted" />
      <Skeleton className="h-5 w-full mb-[1em] bg-muted dakr:bg-muted" />
      <Skeleton className="h-5 w-full mb-[1em] bg-muted dakr:bg-muted" />
      <Skeleton className="h-5 w-full mb-[1em] bg-muted dakr:bg-muted" />
      <Skeleton className="h-5 w-full mb-[1em] bg-muted dakr:bg-muted" />
      <Skeleton className="h-5 w-full mb-[1em] bg-muted dakr:bg-muted" />
    </div>
  );
};

export default ContentPostSkeleton;
