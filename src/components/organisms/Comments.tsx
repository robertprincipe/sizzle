import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
// import Feedback from "../atoms/Feedback";
import { toast } from "sonner";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import {
  commentPost,
  commentsPost,
  deleteCommentPost,
  updateCommentPost,
} from "@/services/blog";
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
    const commentDataPost = {
      ...data,
      id: editComment?.id,
      post_id,
      parent_id: toReply?.parent_id ? toReply.parent_id : toReply?.id,
    };

    try {
      const data = editComment
        ? await updateCommentPost(commentDataPost)
        : await commentPost(commentDataPost);
      toast(editComment ? "Comentario editado." : "Comentario creado.");
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
    <div className="mt-3" id="comments">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-accent-foreground">
          Comentarios ({comment_count || 0})
        </h4>
      </div>
      <form className="mb-6" onSubmit={handleSubmit(onSubmit)} id="to-comment">
        {toReply && (
          <div className="px-2 pb-2">
            <div className="mb-1 text-sm">Contestar a:</div>
            <div className="flex items-center space-x-2">
              <div className="w-1 h-8 bg-muted rounded-full dark:bg-muted" />
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
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
                <p className="inline-flex items-center text-sm text-dark dark:text-muted">
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
          {/* <Feedback field={errors.content} /> */}
          <Button>
            {/* {&& <Loader2 className="animate-spin" />} */}
            Comentar
          </Button>
        </div>
      </form>
      {data?.map((comment) => (
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
  );
};

export default Comments;
