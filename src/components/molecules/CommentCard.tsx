import { IComment } from "@/types/iblog";
import { fromNow } from "@/lib/date";

import { Reply, Settings2 } from "lucide-react";

const CommentCard = ({
  comment,
  setToReply,
  children,
}: {
  comment: IComment;
  setToReply: (toReply: IComment) => void;
  children?: React.ReactNode;
}) => {
  return (
    <article
      className={`py-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900${
        comment.parent_id ? " ml-6 lg:ml-12" : ""
      }`}
      id={`comment-${comment.id}`}
    >
      <footer className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center text-sm text-gray-900 dark:text-white">
            <img
              className="w-6 h-6 mr-2 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              alt="Michael Gough"
            />
            {comment.user?.username}
          </p>
          <span className="mx-1.5">•</span>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <time dateTime="2022-02-08" title="February 8th, 2022">
              {fromNow(comment.created_at || new Date())}
            </time>
          </p>
        </div>
        <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <Settings2 />
          <span className="sr-only">Comment settings</span>
        </button>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">{comment.content}</p>
      <div className="flex items-center mt-4 space-x-4">
        <a
          className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
          onClick={() => setToReply(comment)}
          href="#to-comment"
        >
          <Reply className="mr-2" />
          <span>Reply</span>
        </a>
      </div>
      {children}
    </article>
  );
};

export default CommentCard;
