import useClickOutside from "@/hooks/useClickOutside";

import { Suspense, lazy, useState } from "react";
import { toastError } from "@/lib/errors";
import { reactPost, reactionList } from "@/services/blog";
import { Loader2, SmilePlus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
// import EmojiPicker from "emoji-picker-react";
const EmojiPickerComponent = lazy(() => import("./EmojiPicker"));

type IReactPostProps = {
  postId: string;
};

const ReactPost = ({ postId }: IReactPostProps) => {
  const [isOpenReactions, setIsOpenReactions] = useState(false);
  const emojisRef = useClickOutside(() => setIsOpenReactions(false));

  //   const { data: reactions, refetch } = useQuery(["reactsPost"], () =>
  //     reactsPost(postId)
  //   );

  const {
    data: reaction_list,
    refetch,
    isLoading,
  } = useQuery(["reactionList"], () => reactionList(postId));

  //   console.log(reactions?.data);

  const reactToPost = async (emoji: any) => {
    console.log("emoji", emoji);
    setIsOpenReactions(false);
    try {
      const { data: dataReact } = await reactPost(
        postId,
        typeof emoji === "string" ? emoji : emoji.native
      );
      refetch();
    } catch (error) {
      toastError(error);
    }
  };

  //   const countedReactions = reactions?.data.reduce((result, reaction) => {
  //     const emoji = reaction.emoji;
  //     const matchingObject = result.find((obj) => obj.emoji === emoji);
  //     if (matchingObject) {
  //       matchingObject.count++;
  //     } else {
  //       result.push({ emoji: emoji, count: 1 });
  //     }
  //     return result;
  //   }, [] as { emoji: string; count: number }[]);

  //   [{emoji: "🔥", count: 2}]

  return (
    <div className="inline-block" ref={emojisRef}>
      {isOpenReactions && (
        <Suspense fallback={<div>cargando...</div>}>
          <EmojiPickerComponent reactToPost={reactToPost} />
        </Suspense>
      )}

      {/* <EmojiPicker onEmojiClick={(e) => console.log(e)} /> */}
      <div className="flex items-center text-gray-500 dark:text-gray-400">
        {isLoading ? (
          <div className="flex py-2 pl-2 pr-4 border-t border-b border-l border-gray-400 rounded-l-full dark:border-gray-600">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div className="flex py-1 pl-2 border-t border-b border-l border-gray-400 rounded-l-full dark:border-gray-600">
            {reaction_list?.data && reaction_list?.data?.count > 0 && (
              <>
                {/* (reactions.data.map((r) => <span key={r.id}>{r.emoji}</span>)) */}
                {reaction_list?.data.reactions.map((r, idx) => (
                  <div className="flex items-center" key={idx}>
                    <button
                      className={`hover:text-gray-800 dark:hover:text-gray-200 p-1 rounded-full ${
                        reaction_list?.data?.user_reaction == r.emoji
                          ? "bg-blue-400/40"
                          : ""
                      }`}
                      onClick={() => reactToPost(r.emoji)}
                    >
                      {r.emoji} <span className="text-sm">{r.count}</span>
                    </button>
                    <div className="block h-3 mx-2 border-r border-gray-300 dark:border-gray-600"></div>
                  </div>
                ))}
                {/* // Mostrar la reacción del usuario autenticado si no está en las tres más comunes */}
                {!reaction_list?.data.reactions.some(
                  (r) => r.emoji == reaction_list?.data?.user_reaction
                ) &&
                  reaction_list?.data?.user_reaction && (
                    <div className="flex items-center">
                      <button
                        className={`hover:text-gray-800 dark:hover:text-gray-200 bg-blue-400/40 p-1 rounded-full`}
                        onClick={() =>
                          reactToPost(reaction_list?.data?.user_reaction)
                        }
                      >
                        {reaction_list?.data?.user_reaction}
                      </button>
                      <div className="block h-3 mx-3 border-r border-gray-300 dark:border-gray-600"></div>
                    </div>
                  )}
              </>
            )}
          </div>
        )}

        <button
          className="flex items-center h-full justify-center pr-2 hover:text-gray-800 dark:hover:text-gray-200 border-r border-t border-b rounded-r-full py-2.5 border-gray-400 dark:border-gray-600"
          onClick={() => setIsOpenReactions(!isOpenReactions)}
        >
          <SmilePlus className="h-5 mr-2.5" />
          <span className="text-sm">{reaction_list?.data.count}</span>
        </button>
      </div>
    </div>
  );
};

export default ReactPost;
