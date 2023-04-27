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

import { postCreate } from "@/services/blog";
import { ITag } from "@/types/iblog";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { makeSlug } from "@/lib/strings";
import { IPost } from "@/types/iblog";
import Head from "../shared/Head";

const Dropimage = lazy(() => import("./Dropimage"));
const EditorJSX = lazy(() => import("./EditorJSX"));

const postPatchSchema = z.object({
  title: z.string().min(3).max(128),
});

type FormData = z.infer<typeof postPatchSchema>;

type IEditorProps = {
  preDataFill?: IPost;
};

export function Editor({ preDataFill }: IEditorProps) {
  const [tags, setTags] = useState<ITag[]>([]);
  const [coverImage, setCoverImage] = useState<Blob | undefined>();
  const [blocks, setBlocks] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
    mode: "onSubmit",
  });

  const { toast } = useToast();

  const { mutate, isLoading } = useMutation(postCreate, {
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
      (async () => {
        return await fetch((preDataFill.cover_image as string) || "").then(
          (r) => r.blob()
        );
      })();
      reset(preDataFill);
      setTags(preDataFill.tags || []);
      setBlocks(JSON.parse(preDataFill.content || "{}"));
      setCoverImage(undefined);
    }
  }, [preDataFill]);

  async function onSubmit(data: FormData) {
    mutate({
      ...data,
      cover_image: coverImage,
      tags,
      slug: makeSlug(data.title, "-"),
      content: JSON.stringify(blocks),
    });
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Head title="Crear publicación" />
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
            <p className="text-sm text-slate-600">Published</p>
          </div>
          <button
            className={cn(buttonVariants())}
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            <span>Guardar</span>
          </button>
        </div>
        <div className="prose prose-stone mx-auto lg:w-[800px] p-2 text-gray-900 dark:prose-invert dark:text-white">
          <Suspense>
            <Dropimage setImageFile={setCoverImage} />
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
}
