import TextareaAutosize from "react-textarea-autosize";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lazy, Suspense, useEffect, useState } from "react";

import { z } from "zod";

import { useMutation, useQuery } from "@tanstack/react-query";

import { patchPost, postData } from "@/services/blog";
import { useToast } from "@/hooks/use-toast";

import { Link, useParams, useSearchParams } from "react-router-dom";

import { toastError } from "@/lib/errors";
import Feedback from "@/components/atoms/Feedback";
import Head from "@/components/shared/Head";
import InputTags from "@/components/organisms/InputTags";
import { makeSlug } from "@/lib/strings";

const Dropimage = lazy(() => import("@/components/organisms/Dropimage"));
const RichTextEditor = lazy(
  () => import("@/components/organisms/RichTextEditor")
);

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

const PostEditor = () => {
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
  const [fetchEnabled, setFetchEnabled] = useState(true);

  // mostrar los cambio de estado del formulario

  const { id } = useParams();
  const { data: preDataFill } = useQuery(
    ["postData", id],
    () => postData(id || ""),
    {
      cacheTime: 0,
      staleTime: 0,
      enabled: fetchEnabled,
      onSuccess: (data) => {
        console.log("2 reload");
        reset({ ...data.data, cover_image: undefined });
      },
    }
  );
  useEffect(() => {
    if (!preDataFill) {
      setFetchEnabled(false);
    }
  }, []);

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

  const onSubmit = async (data: formData) => {
    mutate({ ...data, slug: makeSlug(data.title, "-") });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            <button className={cn(buttonVariants())}>
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
                  imageUrl={preDataFill?.data?.cover_image}
                  setImageFile={onChange}
                  previewSize="md"
                />
              )}
            />
          </Suspense>
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
            render={({ field: { onChange } }) => (
              <InputTags
                defaultTags={preDataFill?.data?.tags}
                onChange={onChange}
              />
            )}
          />

          <Suspense>
            {preDataFill && (
              <Controller
                name="content"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RichTextEditor
                    initialBlocks={preDataFill?.data?.content}
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
