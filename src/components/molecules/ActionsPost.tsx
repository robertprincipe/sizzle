import { MessageCircle, Share2 } from "lucide-react";
// import ReactPost from "@/components/molecules/ReactPost";
import { Skeleton } from "../ui/skeleton";
import ReactPost from "./ReactPost";

const ActionsPost = ({
  post_id,
  comment_count,
  reaction_count,
  sendJsonMessage,
}: {
  post_id: string;
  comment_count?: number;
  reaction_count?: number;
  sendJsonMessage: any;
}) => {
  const IsLoading = !post_id && !comment_count;
  return (
    <div className="sticky inset-x-0 my-6 text-center bottom-6">
      {IsLoading ? (
        <>
          <Skeleton className="h-[65px] w-[300px] bg-dark dark:bg-muted rounded-full shadow-md inline-block" />
        </>
      ) : (
        <div className="relative inline-block px-4 py-3 rounded-full shadow-md text-card-foreground bg-card">
          <div className="flex items-center gap-x-1.5">
            <ReactPost
              postId={post_id}
              reaction_count={reaction_count}
              sendJsonMessage={sendJsonMessage}
            />
            <div className="h-3 mx-3 border-r border-r-border"></div>

            <div className="flex items-center gap-x-1.5 mt-2 md:mt-0">
              <div className="inline-block hs-tooltip">
                <a
                  className="flex items-center text-sm gap-x-2"
                  href="#comments"
                >
                  <MessageCircle className="h-5" />
                  {comment_count}
                  <span
                    className="absolute z-10 invisible inline-block px-2 py-1 text-xs font-medium transition-opacity bg-indigo-500 rounded-md shadow-sm"
                    role="tooltip"
                  >
                    Comment
                  </span>
                </a>
              </div>

              <div className="block h-3 mx-3 border-r border-muted dark:border-dark"></div>

              <div className="relative inline-flex">
                <button
                  id="blog-article-share-dropdown"
                  className="flex items-center text-sm gap-x-2"
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
