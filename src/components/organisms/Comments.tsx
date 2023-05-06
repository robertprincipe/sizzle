import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Feedback from "../atoms/Feedback";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  commentPost,
  commentsPost,
  deleteCommentPost,
  updateCommentPost,
} from "@/services/blog";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { IComment } from "@/types/iblog";
import { useState } from "react";
import CommentCard from "../molecules/CommentCard";
import { toastError } from "@/lib/errors";

const commentSchema = z.object({
  content: z
    .string({ required_error: "El comentario es requerido" })
    .min(3, "Mínimo 3 caracteres"),
});

type commentData = z.infer<typeof commentSchema>;

type ICommentsProps = {
  post: {
    id?: string;
    comment_count?: number;
  };
};

const Comments = ({ post: { id: post_id, comment_count } }: ICommentsProps) => {
  const [toReply, setToReply] = useState<IComment>();
  const [editComment, setEditComment] = useState<IComment>();
  const { toast } = useToast();

  const { data, refetch } = useQuery(["comments", post_id], () =>
    commentsPost(post_id || "")
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<commentData>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (data: commentData) => {
    console.log(data);

    const commentDataPost = {
      ...data,
      id: editComment?.id,
      post_id,
      parent_id: toReply?.parent_id ? toReply.parent_id : toReply?.id,
    };

    try {
      const { data } = editComment
        ? await updateCommentPost(commentDataPost)
        : await commentPost(commentDataPost);
      toast({
        description: `${
          editComment ? "Comentario editado." : "Comentario creado."
        }`,
      });
      reset({
        content: "",
      });
      setToReply(undefined);
      setEditComment(undefined);
      refetch();
      window.location.hash = `#comm-${data?.id}`;
    } catch (error) {
      toastError(error);
    }
  };

  const updatePost = (comment: IComment) => {
    setEditComment(comment);
    reset(comment);
  };

  const deleteComment = async (id: string) => {
    try {
      await deleteCommentPost(id);
      refetch();
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <section className="py-8 bg-white dark:bg-gray-900 lg:py-16" id="comments">
      <div className="max-w-2xl px-4 mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-gray-900 lg:text-2xl dark:text-white">
            Comentarios ({comment_count || 0})
          </h4>
        </div>
        <form
          className="mb-6"
          onSubmit={handleSubmit(onSubmit)}
          id="to-comment"
        >
          {toReply && (
            <div className="px-2 pb-2">
              <div className="text-sm mb-1">Contestar a:</div>
              <div className="flex items-center space-x-2">
                <div className="bg-gray-500 dark:bg-gray-300 w-1 h-8 rounded-full" />
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1 items-center">
                    <img
                      className="w-6 h-6 rounded-full"
                      src={toReply.user?.picture as string}
                      alt="Michael Gough"
                    />
                    <span className="font-semibold">
                      {toReply.user?.username}
                    </span>
                    :
                  </div>
                  <p className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                    {toReply.content}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="grid w-full gap-2">
            <Textarea
              placeholder="Type your message here."
              {...register("content")}
            />
            <Feedback field={errors.content} />
            <Button>
              {/* {&& <Loader2 className="animate-spin" />} */}
              Comentar
            </Button>
          </div>
        </form>
        {data?.data.map((comment) => (
          <div key={comment.id}>
            <CommentCard
              comment={comment}
              setToReply={setToReply}
              onDelete={deleteComment}
              onEdit={updatePost}
              children={
                comment.replies &&
                comment.replies.map((reply) => (
                  <CommentCard
                    key={reply.id}
                    comment={reply}
                    setToReply={setToReply}
                    onDelete={deleteComment}
                    onEdit={updatePost}
                  />
                ))
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Comments;
