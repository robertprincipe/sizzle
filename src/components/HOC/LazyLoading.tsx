import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

type ILazyLoadingProps<T> = T;

const LazyLoading =
  <T extends object>(Component: React.ComponentType<ILazyLoadingProps<T>>) =>
  (props: T) => {
    return (
      <Suspense
        fallback={
          <Skeleton className="w-full h-full bg-gray-200 dark:bg-gray-500" />
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };

export default LazyLoading;
