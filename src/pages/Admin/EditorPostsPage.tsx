import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { fromNow } from "@/lib/date";
import { useQuery } from "@tanstack/react-query";
import { deletePost, editorPosts } from "@/services/blog";
import { Link, useLocation } from "react-router-dom";
import { CircleDot, Edit3 } from "lucide-react";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import ConfirmOperation from "@/components/shared/ConfirmOperation";
import { toastError } from "@/lib/errors";
import { toast } from "sonner";
import ButtonPostCreator from "@/components/shared/ButtonPostCreator";
import { Skeleton } from "@/components/ui/skeleton";
import Heading from "@/components/layouts/components/Heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "Dashboard",
};

const EditorPostsPage = () => {
  const {
    data: posts,
    isLoading,
    isError,
    refetch,
  } = useQuery(["editorPosts"], editorPosts, {
    // solo pedir una vez
    cacheTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const { pathname } = useLocation();

  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<string>();

  const deletePst = async (id?: string) => {
    setShowDeleteAlert(true);
    setPostToDelete(id);
    console.log("post id", id);
  };

  const removePost = async () => {
    try {
      if (postToDelete) {
        const { data } = await deletePost(postToDelete);
        toast(data.message);
        setShowDeleteAlert(false);
        refetch();
      }
    } catch (error) {
      console.log(error);
      toastError(error);
    }
  };

  const postsPublished = posts?.filter((p) => p.published === true);
  const postsDraft = posts?.filter((p) => p.published === false);

  console.log(postsPublished)

  // console.log()

  return (
    <div className="">
      <Heading
        title="Todas tus publicaciones"
        description="Editalas haciendo click en el nombre"
        children={<ButtonPostCreator />}
      />
      {isLoading && !isError ? (
        <>
          <div className="p-4">
            <div className="space-y-3">
              <Skeleton className="w-2/5 h-5" />
              <Skeleton className="w-4/5 h-4" />
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <Skeleton className="w-2/5 h-5" />
              <Skeleton className="w-4/5 h-4" />
            </div>
          </div>
        </>
      ) : (
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Publicados</TabsTrigger>
            <TabsTrigger value="password">Borradores</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <div className="border divide-y rounded-md border-muted divide-muted dark:border-dark dark:divide-dark">
              {postsPublished?.map((post) => (
                <div
                  className="grid items-center justify-between grid-cols-8 p-4"
                  key={post.id}
                >
                  <div className="col-span-1">
                    {post.cover_image && (
                        <img
                          src={(post.cover_image as string) || ""}
                          className="block object-cover object-center h-28 w-28"
                          alt=""
                        />
                      )}
                  </div>
                  <div className="grid justify-between col-span-5 gap-1">
                    <Link
                      to={`/post/${post.slug}`}
                      className="text-xl font-semibold"
                      target="_blank"
                    >
                      {post.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                        {fromNow(post.created_at || new Date())}
                      </p>
                    <div className="flex space-x-2 text-sm font-medium">
                        <Link
                          to={`/admin/posts/${post.id}/edit?backTo=${pathname}`}
                          className="text-blue-400 underline"
                        >
                          Edit
                        </Link>
                        <button className="text-red-500 underline" onClick={() => deletePst(post.id)}>
                          Delete
                        </button>
                      </div>
                  </div>
                  <div className="flex justify-end col-span-2 space-x-2 divide-x-2 divide-border">
                   <div className="flex flex-col items-center px-3 py-1">
                    <span className="text-lg">9</span>
                    <span className="text-xs font-semibold">Reactions</span>
                   </div>
                   <div className="flex flex-col items-center px-3 py-1">
                    <span className="text-lg">10</span>
                    <span className="text-xs font-semibold">Comments</span>
                   </div>
                   <div className="flex flex-col items-center px-3 py-1">
                    <span className="text-lg">110</span>
                    <span className="text-xs font-semibold">Reads</span>
                   </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="password">
            <div className="border divide-y rounded-md border-muted divide-muted dark:border-dark dark:divide-dark">
              {postsDraft?.map((post) => (
                <div
                  className="grid items-center justify-between grid-cols-8 p-4"
                  key={post.id}
                >
                  <div className="grid col-start-1 col-end-6 gap-1 md:col-end-5">
                    <a
                      href={`/post/${post.slug}`}
                      className="font-semibold"
                      target="_blank"
                    >
                      {post.title}
                    </a>
                    <div>
                      <p className="text-sm text-muted">
                        {fromNow(post.created_at || new Date())}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end col-start-6 col-end-7 md:col-start-5 md:col-end-8 md:justify-center">
                    <div
                      className={`inline-flex select-none p-1.5 md:py-1 md:px-2 rounded-full text-xs font-medium ${
                        post.published
                          ? "bg-green-400 md:bg-green-200 text-green-800"
                          : "bg-yellow-400 md:bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      <span className="hidden md:block">
                        {post.published ? "Publicado" : "Borrador"}
                      </span>
                    </div>
                  </div>

                  {/* <PostOperations post={{ id: post.id, title: post.title }} /> */}

                  <div className="flex justify-end col-start-8 col-end-9 space-x-2">
                    <Link
                      to={`/admin/posts/${post.id}/edit?backTo=${pathname}`}
                      className="font-semibold hover:underline"
                    >
                      <Edit3 className="text-blue-400" />
                    </Link>
                    <button onClick={() => deletePst(post.id)}>
                      <Trash2 className="text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {isError ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any posts yet. Start creating content.
          </EmptyPlaceholder.Description>
          <ButtonPostCreator />
        </EmptyPlaceholder>
      ) : null}

      <ConfirmOperation
        title="Eliminar publicación"
        description="Esta acción es irreversible"
        onConfirm={removePost}
        setShowDeleteAlert={setShowDeleteAlert}
        showDeleteAlert={showDeleteAlert}
      />
    </div>
  );
};

export default EditorPostsPage;
