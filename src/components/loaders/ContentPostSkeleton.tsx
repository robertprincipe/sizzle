import { Skeleton } from "@/components/ui/skeleton";

const ContentPostSkeleton = () => {
  return (
    <div className="mt-[1.5rem]">
      <Skeleton className="h-8 mb-[1em] w-full bg-gray-600 dark:bg-gray-200" />
      <Skeleton className="h-5 w-full mb-[1em] bg-gray-400 dakr:bg-gray-200" />
      <Skeleton className="h-5 w-full mb-[1em] bg-gray-400 dakr:bg-gray-200" />
      <Skeleton className="h-5 w-full mb-[1em] bg-gray-400 dakr:bg-gray-200" />
      <Skeleton className="h-5 w-full mb-[1em] bg-gray-400 dakr:bg-gray-200" />
      <Skeleton className="h-5 w-full mb-[1em] bg-gray-400 dakr:bg-gray-200" />
      <Skeleton className="h-5 w-full mb-[1em] bg-gray-400 dakr:bg-gray-200" />
    </div>
  );
};

export default ContentPostSkeleton;
