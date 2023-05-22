import { lazy, Suspense, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Feedback from "@/components/atoms/Feedback";
import Head from "@/components/shared/Head";
import InputTags from "@/components/organisms/InputTags";
import { formPostData, postPatchSchema } from "@/types/schemas";
import TextareaAutosize from "react-textarea-autosize";
import { patchPost, postData } from "@/services/blog";
import DropImageFile from "@/components/organisms/DropimageFile";

const RichTextEditor = lazy(
  () => import("@/components/organisms/RichTextEditor")
);

const PostEditor = () => {
  const [params] = useSearchParams();
  const { id } = useParams();
  const [coverImage, setCoverImage] = useState<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<formPostData>({
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

  const onSubmit = async (data: formPostData) =>
    mutate({ ...data, cover_image: coverImage });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Head title={`${post?.title} | Editor publicación`} />
      <div className="grid w-full gap-4 md:gap-10">
        <div className="container flex items-center justify-between w-full mx-auto mt-5">
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
          </div>
          <div className="space-x-2">
            <label
              htmlFor="published"
              className="inline-flex h-10 px-3 items-center justify-center rounded-md text-sm font-medium transition-colors data-[state=on]:bg-slate-200 dark:hover:bg-slate-800 dark:data-[state=on]:bg-slate-700 focus:outline-none dark:text-slate-100 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-offset-slate-900 dark:hover:text-slate-100 dark:data-[state=on]:text-slate-100 bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 active:bg-red-400 checked:bg-green-300"
            >
              Publicado
              <input
                type="checkbox"
                id="published"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:border-gray-600 checked:bg-gray-700"
                {...register("published")}
              />
            </label>
            <button className={cn(buttonVariants())} disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              <span>Guardar</span>
            </button>
          </div>
        </div>
        <div className="prose prose-stone mx-auto lg:w-[800px] p-2 text-gray-900 dark:prose-invert dark:text-white">
          <DropImageFile
            defaultImage={post?.cover_image as string}
            value={coverImage}
            onChange={setCoverImage}
          />
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={""}
            placeholder="Post title"
            className="w-full my-1 overflow-hidden text-3xl font-bold appearance-none resize-none md:my-3 md:text-4xl lg:text-5xl focus:outline-none dark:bg-transparent"
            {...register("title")}
          />
          <Feedback field={errors.title} />
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
