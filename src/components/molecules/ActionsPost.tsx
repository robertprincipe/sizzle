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
    <div className="sticky inset-x-0 my-6 text-center bottom-6">
      {IsLoading ? (
        <>
          <Skeleton className="h-[65px] w-[300px] bg-dark dark:bg-muted rounded-full shadow-md inline-block" />
        </>
      ) : (
        <div className="relative inline-block px-4 py-3 bg-light rounded-full shadow-md dark:bg-app-dark">
          <div className="flex items-center gap-x-1.5">
            <ReactPost postId={post_id || ""} reaction_count={reaction_count} />
            <div className="h-3 mx-3 border-r border-muted dark:border-dark"></div>

            <div className="flex items-center gap-x-1.5 mt-2 md:mt-0">
              <div className="inline-block hs-tooltip">
                <a
                  className="flex items-center text-sm text-muted hs-tooltip-toggle gap-x-2 hover:text-dark dark:text-muted dark:hover:text-muted"
                  href="#comments"
                >
                  <MessageCircle className="h-5" />
                  {comment_count}
                  <span
                    className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium text-light transition-opacity bg-indigo-500 rounded-md shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible dark:bg-black"
                    role="tooltip"
                  >
                    Comment
                  </span>
                </a>
              </div>

              <div className="block h-3 mx-3 border-r border-muted dark:border-dark"></div>

              <div className="relative inline-flex hs-dropdown">
                <button
                  id="blog-article-share-dropdown"
                  className="flex items-center text-sm text-muted hs-dropdown-toggle gap-x-2 hover:text-dark dark:text-muted dark:hover:text-muted"
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
