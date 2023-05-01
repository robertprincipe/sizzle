import TextareaAutosize from "react-textarea-autosize";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lazy, useState, Suspense, useEffect } from "react";

import { z } from "zod";

import InputTags from "./InputTags";

import { useMutation } from "@tanstack/react-query";

import { deleteImagePost, patchPost, postCreate } from "@/services/blog";
import { ITag } from "@/types/iblog";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { genId, makeSlug } from "@/lib/strings";
import { IPost } from "@/types/iblog";
import Head from "../shared/Head";
import { toastError } from "@/lib/errors";

const Dropimage = lazy(() => import("./Dropimage"));
const EditorJSX = lazy(() => import("./EditorJSX"));

const postPatchSchema = z.object({
  title: z.string().min(3).max(128),
  published: z.boolean(),
});

type formData = z.infer<typeof postPatchSchema>;

type IEditorProps = {
  preDataFill?: IPost;
};

const Editor = ({ preDataFill }: IEditorProps) => {
  const [tags, setTags] = useState<ITag[]>([]);
  const [coverImage, setCoverImage] = useState<Blob | string | undefined>();
  const [blocks, setBlocks] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formData>({
    resolver: zodResolver(postPatchSchema),
    mode: "onSubmit",
  });

  const { toast } = useToast();

  const { mutate, isLoading } = useMutation(patchPost, {
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast({
          description: Object.values(error.response?.data)
            .map((msg) => msg)
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
      toast({
        description: "Publicación guardada.",
      });
    },
  });

  useEffect(() => {
    if (preDataFill) {
      reset(preDataFill);
      setTags(preDataFill.tags || []);
      console.log(preDataFill.content);

      setBlocks(JSON.parse(preDataFill.content || "{}"));
    }
  }, [preDataFill]);

  async function onSubmit(data: formData) {
    mutate({
      ...data,
      id: preDataFill?.id,
      cover_image: coverImage,
      tags,
      slug: makeSlug(data.title, "-"),
      content: JSON.stringify(blocks),
    });
  }

  const onRemoveImageUrl = async () => {
    try {
      const { data } = await deleteImagePost(preDataFill?.id || "");
      toast({
        description: data.message,
      });
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Head title="Editor publicación" />
      <div className="grid w-full gap-4 md:gap-10">
        <div className="container flex items-center justify-between w-full mx-auto mt-5">
          <div className="flex items-center space-x-10">
            <a
              href="/dashboard"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                })
              )}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Atras
            </a>
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
            <Dropimage
              imageUrl={preDataFill?.cover_image}
              onRemoveImageUrl={onRemoveImageUrl}
              setImageFile={setCoverImage}
            />
          </Suspense>
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={""}
            placeholder="Post title"
            className="w-full my-3 overflow-hidden text-5xl font-bold appearance-none resize-none focus:outline-none dark:bg-transparent"
            {...register("title")}
          />
          <InputTags tags={tags} setTags={setTags} />
          <Suspense>
            <EditorJSX blocks={blocks} setBlocks={setBlocks} />
          </Suspense>
        </div>
      </div>
    </form>
  );
};

export default Editor;
