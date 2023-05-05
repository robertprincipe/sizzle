import TextareaAutosize from "react-textarea-autosize";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lazy, useState, Suspense, useEffect } from "react";

import { z } from "zod";

import InputTags from "./InputTags";

import { useMutation, useQuery } from "@tanstack/react-query";

import { patchPost, postData } from "@/services/blog";
import { ITag } from "@/types/iblog";
import { useToast } from "@/hooks/use-toast";
import { makeSlug } from "@/lib/strings";
import { IPost } from "@/types/iblog";
import Head from "../shared/Head";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Feedback from "../atoms/Feedback";
import { toastError } from "@/lib/errors";
import Dropzone from "react-dropzone";

const Dropimage = lazy(() => import("./Dropimage"));
const RichTextEditor = lazy(() => import("./RichTextEditor"));

const postPatchSchema = z.object({
  id: z.string().optional(),
  title: z
    .string({ required_error: "El titulo es requerido." })
    .min(3, "El titulo debe tener al menos 3 caracteres.")
    .max(128, "El titulo debe tener menos de 128 caracteres."),
  published: z.boolean(),
  slug: z.string().optional(),
  cover_image: z.union([z.string(), z.undefined(), z.any()]).optional(),
  content: z.any().optional(),
  tags: z
    .array(
      z.object({ name: z.string({ required_error: "El tag es requerido." }) })
    )
    .optional(),
});

type formData = z.infer<typeof postPatchSchema>;
type IPostEditorProps = {
  preDataFill?: IPost;
};

const PostEditor = ({ preDataFill }: IPostEditorProps) => {
  const [params] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<formData>({
    resolver: zodResolver(postPatchSchema),
    mode: "onSubmit",
  });

  const { toast } = useToast();

  const { id } = useParams();
  useQuery(["postData", id], () => postData(id || ""), {
    cacheTime: 0,
    staleTime: 0,
    onSuccess: (data) => {
      reset(data.data);
    },
  });

  const { mutate, isLoading } = useMutation(patchPost, {
    onError: (error) => {
      console.log(error);
      toastError(error);
    },
    onSuccess: () => {
      toast({
        description: "Publicación guardada.",
      });
    },
  });

  const onSubmit = async (data: formData) => mutate(data);

  /*
postUpdated.imageUrl && !postUpdated.coverImage
          ? undefined // no change
          : !postUpdated.imageUrl && !postUpdated.coverImage
          ? "" // remove
          : postUpdated.coverImage, // change
  */

  const onRemoveImageUrl = () => {
    // setCoverImage("");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Head title="Editor publicación" />
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
            <button
              className={cn(buttonVariants())}
              onClick={handleSubmit(onSubmit)}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              <span>Guardar</span>
            </button>
          </div>
        </div>
        <div className="prose prose-stone mx-auto lg:w-[800px] p-2 text-gray-900 dark:prose-invert dark:text-white">
          <Suspense>
            <Controller
              name="cover_image"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Dropimage
                  imageUrl={preDataFill?.cover_image}
                  // onRemoveImageUrl={onRemoveImageUrl}
                  setImageFile={onChange}
                  // onChange={onChange}
                  previewSize="md"
                />
              )}
            />
          </Suspense>
          {/* <Feedback field={errors.cover_image} /> */}
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
            defaultValue={preDataFill?.tags}
            render={({ field: { value, onChange } }) => (
              <InputTags tags={value} setTags={onChange} />
            )}
          />
          {/* <Feedback field={errors.tags} /> */}
          {/* <Controller
            control={control}
            name="cover_image"
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            render={({ field: { onChange, onBlur }, fieldState }) => (
              <Dropzone
                noClick
                onDrop={(acceptedFiles: any) => {
                  setValue("cover_image", acceptedFiles[0], {
                    shouldValidate: true,
                  });
                }}
              >
                {({
                  getRootProps,
                  getInputProps,
                  open,
                  isDragActive,
                  acceptedFiles,
                }) => (
                  <div>
                    <div
                      style={{
                        borderStyle: "dashed",
                        backgroundColor: isDragActive
                          ? `#808080`
                          : "transparent",
                      }}
                      {...getRootProps()}
                    >
                      <input
                        {...getInputProps({
                          id: "spreadsheet",
                          onChange,
                          onBlur,
                        })}
                      />

                      <p>
                        <button type="button" onClick={open}>
                          Choose a file
                        </button>{" "}
                        or drag and drop
                      </p>

                      {acceptedFiles.length
                        ? acceptedFiles[0].name
                        : "No file selected."}

                      <div>
                        {fieldState.error && (
                          <span role="alert">{fieldState.error.message}</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Dropzone>
            )}
          /> */}
          <Suspense>
            {preDataFill && (
              <Controller
                name="content"
                control={control}
                // defaultValue={preDataFill?.content}
                render={({ field: { value, onChange } }) => (
                  <RichTextEditor
                    initialBlocks={preDataFill?.content}
                    onChange={onChange}
                  />
                )}
              />
            )}
          </Suspense>
          {/* <Feedback field={errors.content} /> */}
        </div>
      </div>
    </form>
  );
};

export default PostEditor;
