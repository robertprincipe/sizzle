import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastError } from "@/lib/errors";
import { genId, makeSlug } from "@/lib/strings";
import { Button } from "@/components/ui/button";
import { postCreate } from "@/services/blog";
import { cn } from "@/lib/utils";

const ButtonPostCreator = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useNavigate();
  const createPost = async () => {
    setIsLoading(true);
    try {
      const { data: post } = await postCreate({
        title: "Nueva publicación",
        slug: `${makeSlug("Nueva publicación", "-")}-${genId(5)}`,
      });

      setIsLoading(false);
      router(`/admin/posts/${post.id}/edit`);
    } catch (error) {
      toastError(error);
    }
  };
  return (
    <Button
      onClick={createPost}
      className={cn({
        "cursor-not-allowed opacity-60": isLoading,
      })}
      // disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Plus className="w-4 h-4 mr-2" />
      )}
      Crear Publicación
    </Button>
  );
};

export default ButtonPostCreator;
