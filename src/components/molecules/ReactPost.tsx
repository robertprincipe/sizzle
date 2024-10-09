import { Suspense, lazy, useEffect, useState } from "react";
import { Loader2, SmilePlus } from "lucide-react";
import useWebSocket from "react-use-websocket";
import { useAuthStore } from "@/store/auth";
import { IReaction, IReactionList } from "@/types/iblog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useQuery } from "@tanstack/react-query";
import { reactionUser } from "@/services/blog";
const EmojiPickerComponent = lazy(() => import("./EmojiPicker"));

type IReactPostProps = {
  postId: string;
  reaction_count?: number;
  sendJsonMessage: any;
};

const ReactPost = ({
  postId,
  reaction_count,
  sendJsonMessage,
}: IReactPostProps) => {
  const {
    data: reaction,
    error,
    refetch,
  } = useQuery(["reaction_user", postId], () => reactionUser(postId));
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  console.log(reaction);

  const reactToPost = async (emoji: any) => {
    sendJsonMessage({ type: "react_post", emoji: emoji.native });
    refetch();
  };

  return (
    <div className="inline-block">
      <div className="flex items-center">
        {isAuthenticated && (
          <button
            className={`flex items-center text-muted-foreground p-1 rounded-full bg-blue-400/40`}
          >
            <span>{reaction?.emoji}</span>{" "}
          </button>
        )}

        <Popover>
          <PopoverTrigger className="flex items-center h-full justify-center py-2.5">
            <SmilePlus className="h-5 mr-2.5" />
            <span>{reaction_count}</span>
          </PopoverTrigger>
          <PopoverContent className="p-0 overflow-auto rounded-xl w-[354px] flex justify-center items-center">
            <EmojiPickerComponent reactToPost={reactToPost} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ReactPost;
