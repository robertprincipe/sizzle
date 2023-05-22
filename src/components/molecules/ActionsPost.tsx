import { MessageCircle, Share2 } from "lucide-react";
// import ReactPost from "@/components/molecules/ReactPost";
import { Skeleton } from "../ui/skeleton";
import ReactPost from "./ReactPost";

const ActionsPost = ({
  post_id,
  comment_count,
  reaction_count,
}: {
  post_id?: string;
  comment_count?: number;
  reaction_count?: number;
}) => {
  const IsLoading = !post_id && !comment_count;
  return (
    <div className="sticky inset-x-0 text-center bottom-6 my-6">
      {IsLoading ? (
        <>
          <Skeleton className="h-[65px] w-[300px] bg-gray-600 dark:bg-gray-400 rounded-full shadow-md inline-block" />
        </>
      ) : (
        <div className="relative inline-block px-4 py-3 bg-white rounded-full shadow-md dark:bg-gray-800">
          <div className="flex items-center gap-x-1.5">
            <ReactPost postId={post_id || ""} reaction_count={reaction_count} />
            <div className="h-3 mx-3 border-r border-gray-300 dark:border-gray-600"></div>

            <div className="flex items-center gap-x-1.5 mt-2 md:mt-0">
              <div className="inline-block hs-tooltip">
                <a
                  className="flex items-center text-sm text-gray-500 hs-tooltip-toggle gap-x-2 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                  href="#comments"
                >
                  <MessageCircle className="h-5" />
                  {comment_count}
                  <span
                    className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white transition-opacity bg-gray-900 rounded-md shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible dark:bg-black"
                    role="tooltip"
                  >
                    Comment
                  </span>
                </a>
              </div>

              <div className="block h-3 mx-3 border-r border-gray-300 dark:border-gray-600"></div>

              <div className="relative inline-flex hs-dropdown">
                <button
                  id="blog-article-share-dropdown"
                  className="flex items-center text-sm text-gray-500 hs-dropdown-toggle gap-x-2 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <Share2 className="w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionsPost;
