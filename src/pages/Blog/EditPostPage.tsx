import { lazy, Suspense } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Head from "@/components/shared/Head";
import InputTags from "@/components/organisms/InputTags";
import { formPostData, postPatchSchema } from "@/types/schemas";
import TextareaAutosize from "react-textarea-autosize";
import { patchPost, postData } from "@/services/blog";
import DropImageFile from "@/components/organisms/DropimageFile";
import { Toggle } from "@/components/ui/toggle";
const RichTextEditor = lazy(
  () => import("@/components/organisms/RichTextEditor")
);

const PostEditor = () => {
  const { id } = useParams();
  const [params] = useSearchParams();
  
  const { register, handleSubmit, reset, control } = useForm<formPostData>({
    resolver: zodResolver(postPatchSchema),
    mode: "onSubmit",
  });

  const { data: post } = useQuery(["postData", id], () => postData(id || ""), {
    onSuccess: (data) => reset({ ...data, cover_image: undefined }),
  });

  const { mutate, isLoading } = useMutation(patchPost, {
    onSuccess: () => {
      toast("Publicación guardada.");
    },
  });

  const onSubmit = async (data: formPostData) => mutate({ ...data });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Head title={`${post?.title} | Editor publicación`} />
      <div className="grid w-full gap-4 md:gap-10">
        <div className="container sticky inset-x-0 z-50 flex items-center justify-between w-full h-full mx-auto mt-5 top-5">
          <div className="flex items-center space-x-10">
            <Link
              to={`${params.get("backTo") ?? "/blog"}`}
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
          <button
            className={cn(buttonVariants({ variant: "link" }))}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            <span>Guardar</span>
          </button>
        </div>
        <div className="prose prose-stone mx-auto lg:w-[800px] p-2 text-app-dark dark:prose-invert dark:text-light">
          <Controller
            name="cover_image"
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <DropImageFile
                  defaultImage={post?.cover_image as string}
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

export default PostEditor;
