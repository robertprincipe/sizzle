import { lazy, useEffect, useState } from "react";
import { toastError } from "@/lib/errors";
import { reactPost, reactionList } from "@/services/blog";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import useWebSocket from "react-use-websocket";
import { useAuthStore } from "@/store/auth";
import { IReactionList } from "@/types/iblog";

type IReactionPostProps = {
  postId: string;
  reactionList?: IReactionList;
  sendJsonMessage: any;
};

const ReactionPost = ({
  postId,
  reactionList,
  sendJsonMessage,
}: IReactionPostProps) => {
  useEffect(() => {
    if (postId) {
      console.log("holaloaloal");
      sendJsonMessage({
        type: "reaction_list",
      });
    }
  }, [postId]);

  return (
    <div className="relative order-3 lg:order-1">
      <div className="grid grid-cols-4 gap-3 py-1 pl-2 text-lg">
        {reactionList?.reactions?.length && (
          <>
            {reactionList?.reactions.map((r, idx) => (
              <button
                key={idx}
                className={`flex flex-col items-center hover:text-dark dark:hover:text-muted p-1 rounded-full`}
              >
                <span>{r.emoji}</span>{" "}
                <span className="text-sm">{r.count}</span>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ReactionPost;
