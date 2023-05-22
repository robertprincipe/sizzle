import useClickOutside from "@/hooks/useClickOutside";

import { Suspense, lazy, useState } from "react";
import { toastError } from "@/lib/errors";
import { reactPost, reactionList, userReaction } from "@/services/blog";
import { Loader2, SmilePlus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import useWebSocket from "react-use-websocket";
const EmojiPickerComponent = lazy(() => import("./EmojiPicker"));

type IReactPostProps = {
  postId: string;
  reaction_count?: number;
};

const ReactPost = ({ postId, reaction_count }: IReactPostProps) => {
  const [isOpenReactions, setIsOpenReactions] = useState(false);
  const emojisRef = useClickOutside(() => setIsOpenReactions(false));

  const {
    data: reaction,
    refetch,
    isLoading,
  } = useQuery(["userReaction"], () => userReaction(postId));

  const { sendJsonMessage } = useWebSocket(
    `ws://127.0.0.1:8000/ws/react-post/${postId}`,
    {
      onMessage: (evt) => {
        const data = JSON.parse(evt.data);
        switch (data.type) {
          case "reacted-post":
            break;
          default:
            console.error("Received unknown message type: ", data.type);
            break;
        }
      },
    }
  );

  const reactToPost = async (emoji: any) => {
    sendJsonMessage({ emoji });
    // try {
    //   const { data: dataReact } = await reactPost(
    //     postId,
    //     typeof emoji === "string" ? emoji : emoji.native
    //   );
    //   setIsOpenReactions(false);
    //   refetch();
    // } catch (error) {
    //   toastError(error);
    // }
  };

  return (
    <div className="inline-block" ref={emojisRef}>
      {isOpenReactions && (
        <Suspense
          fallback={
            <Skeleton className="h-40 w-[352px] absolute bottom-20 left-1/2 -translate-x-1/2 bg-gray-100 dark:bg-gray-600" />
          }
        >
          <EmojiPickerComponent reactToPost={reactToPost} />
        </Suspense>
      )}

      <div className="flex items-center text-gray-500 dark:text-gray-400">
        {isLoading ? (
          <div className="flex py-2 pl-2 pr-4">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div className="flex py-1 pl-2">
            {reaction?.user_reaction && (
              <div className="flex items-center">
                <button
                  className={`hover:text-gray-800 dark:hover:text-gray-200 bg-blue-400/40 p-1 rounded-full`}
                  onClick={() => reactToPost(reaction?.user_reaction)}
                >
                  {reaction?.user_reaction}
                </button>
                <div className="block h-3 mx-3 border-r border-gray-300 dark:border-gray-600"></div>
              </div>
            )}
          </div>
        )}

        <button
          className="flex items-center h-full justify-center hover:text-gray-800 dark:hover:text-gray-200 py-2.5"
          onClick={() => setIsOpenReactions(!isOpenReactions)}
        >
          <SmilePlus className="h-5 mr-2.5" />
          <span>{reaction_count}</span>
        </button>
      </div>
    </div>
  );
};

export default ReactPost;
