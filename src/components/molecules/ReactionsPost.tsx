import { lazy, useState } from "react";
import { toastError } from "@/lib/errors";
import { reactPost, reactionList } from "@/services/blog";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

type IReactionPostProps = {
  postId: string;
};

const ReactionPost = ({ postId }: IReactionPostProps) => {
  const {
    data: reaction_list,
    refetch,
    isLoading,
  } = useQuery(["reactionList", postId], () => reactionList(postId), {
    onSuccess: (data) => {
      // console.log(data.reactions);
    },
  });

  const reactToPost = async (emoji: any) => {
    try {
      await reactPost(postId, typeof emoji === "string" ? emoji : emoji.native);
      refetch();
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div className="relative order-3 lg:order-1">
      <div className="sticky flex items-center pt-10 -mt-10 overflow-y-auto text-gray-500 top-16 dark:text-gray-400 lg:w-40 justify-center">
        {isLoading ? (
          <div className="flex py-2 pl-2 pr-4">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3 py-1 pl-2 text-lg">
            {reaction_list && (
              <>
                {reaction_list?.reactions?.map((r, idx) => (
                  <button
                    key={idx}
                    className={`flex flex-col items-center hover:text-gray-800 dark:hover:text-gray-200 p-1 rounded-full ${
                      reaction_list?.user_reaction == r.emoji
                        ? "bg-blue-400/40"
                        : ""
                    }`}
                    onClick={() => reactToPost(r.emoji)}
                  >
                    <span>{r.emoji}</span>{" "}
                    <span className="text-sm">{r.count}</span>
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReactionPost;
