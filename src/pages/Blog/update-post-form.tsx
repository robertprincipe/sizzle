import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Head from "@/components/shared/Head";
import InputTags from "@/components/organisms/InputTags";
import { formPostData, postPatchSchema } from "@/types/schemas";
import TextareaAutosize from "react-textarea-autosize";
import { patchPost, postData } from "@/services/blog";
import DropImageFile from "@/components/organisms/DropimageFile";
import { Toggle } from "@/components/ui/toggle";
import { IPost } from "@/types/iblog";
const RichTextEditor = lazy(
  () => import("@/components/organisms/RichTextEditor")
);

type UpdatePostFormProps = {
  post: IPost;
};

const UpdatePostForm = ({ post }: UpdatePostFormProps) => {
  const { register, handleSubmit, reset, control } = useForm<formPostData>({
    resolver: zodResolver(postPatchSchema),
    mode: "onSubmit",
    defaultValues: post,
  });

  const { mutate, isLoading } = useMutation(patchPost, {
    onSuccess: () => {
      toast("Publicación guardada.");
    },
  });

  const onSubmit = async (data: formPostData) => mutate({ ...data });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-4 md:gap-10">
        <div className="sticky inset-x-0 top-0 z-20 w-full h-full py-5 bg-primary-foreground">
          <div className="flex items-center justify-between max-w-5xl mx-auto bg-primary-foreground">
          <div className="flex items-center space-x-10">
            <Link
              to="/admin/posts"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                })
              )}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Atras
            </Link>
            <Controller
              name="published"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Toggle
                    aria-label="Toggle italic"
                    onPressedChange={onChange}
                    pressed={value}
                    variant={"outline"}
                  >
                    {value ? "Publicado" : "Borrador"}
                  </Toggle>
                );
              }}
            />
          </div>
          <Button
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            <span>Guardar</span>
          </Button>
        </div>
        </div>
        <div className="prose prose-stone text-foreground mx-auto lg:w-[800px] p-2">
          <Controller
            name="cover_image"
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <DropImageFile
                  value={value}
                  // value={value}
                  onChange={onChange}
                />
              );
            }}
          />
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={""}
            placeholder="Post title"
            className="w-full my-1 overflow-hidden text-3xl font-bold bg-transparent appearance-none resize-none md:my-3 md:text-4xl lg:text-5xl focus:outline-none"
            {...register("title")}
          />
          <Controller
            name="tags"
            control={control}
            render={({ field: { value, onChange } }) => {
              return <InputTags defaultTags={post?.tags} onChange={onChange} />;
            }}
          />
          <Suspense>
            {post && (
              <Controller
                name="content"
                control={control}
                render={({ field: { onChange } }) => (
                  <RichTextEditor
                    initialBlocks={post?.content}
                    onChange={onChange}
                  />
                )}
              />
            )}
          </Suspense>
        </div>
      </div>
    </form>
  );
};

export default UpdatePostForm;
