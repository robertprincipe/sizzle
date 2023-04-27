import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Feedback from "../atoms/Feedback";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { commentPost, commentsPost } from "@/services/blog";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { IComment, IPost } from "@/types/iblog";
import { useState } from "react";
import CommentCard from "../molecules/CommentCard";
import { useNavigate } from "react-router-dom";

const commentSchema = z.object({
  content: z
    .string({ required_error: "El comentario es requerido" })
    .min(3, "Mínimo 3 caracteres"),
  parent_id: z.number().optional(),
  post_id: z.number().optional(),
});

type commentData = z.infer<typeof commentSchema>;

type ICommentsProps = {
  post: {
    id?: number;
    comment_count?: number;
  };
};

const Comments = ({ post: { id: post_id, comment_count } }: ICommentsProps) => {
  const [toReply, setToReply] = useState<IComment>();
  const { toast } = useToast();

  const router = useNavigate();

  const { data, refetch } = useQuery(["comments", post_id], () =>
    commentsPost(post_id || 0)
  );

  console.log(data?.data);

  const {
    mutate,
    isLoading,
    data: newComment,
  } = useMutation(commentPost, {
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast({
          description: Object.entries(error.response?.data)
            .map((msg) => `${msg[0]}: ${msg[1]}`)
            .join("\n"),
          variant: "destructive",
        });
      } else {
        toast({
          description: "Algo salio mal, intente más tarde",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      refetch();
      toast({
        description: "Publicación guardada.",
      });
    },
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<commentData>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = (data: commentData) => {
    mutate({ ...data, post_id });

    console.log(newComment);

    reset();
    setToReply(undefined);
    window.location.hash = `#comm-${newComment?.data?.id}`;
  };

  return (
    <section className="py-8 bg-white dark:bg-gray-900 lg:py-16" id="comments">
      <div className="max-w-2xl px-4 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900 lg:text-2xl dark:text-white">
            Comentarios ({comment_count || 0})
          </h2>
        </div>
        <form
          className="mb-6"
          onSubmit={handleSubmit(onSubmit)}
          id="to-comment"
        >
          {toReply && (
            <>
              <input
                type="number"
                className="hidden"
                value={toReply.parent_id ? toReply.parent_id : toReply.id}
                {...register("parent_id", { valueAsNumber: true })}
              />
              <div className="px-4 py-2 border border-gray-300 rounded-lg mb-3">
                <div className="flex items-center">
                  <p className="inline-flex items-center text-sm text-gray-900 dark:text-white">
                    <img
                      className="w-6 h-6 mr-2 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt="Michael Gough"
                    />
                    {toReply.user?.username}
                  </p>
                </div>
                {toReply.content}
              </div>
              <Feedback field={errors.parent_id} />
            </>
          )}
          <div className="grid w-full gap-2">
            <Textarea
              placeholder="Type your message here."
              {...register("content")}
            />
            <Feedback field={errors.content} />
            <Button>
              {isLoading && <Loader2 className="animate-spin" />}
              Comentar
            </Button>
          </div>
        </form>
        {data?.data.map((comment) => (
          <div key={comment.id}>
            <CommentCard
              comment={comment}
              setToReply={setToReply}
              children={
                comment.replies &&
                comment.replies.map((reply) => (
                  <CommentCard
                    key={reply.id}
                    comment={reply}
                    setToReply={setToReply}
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
