import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Head from "@/components/shared/Head";
import { postData } from "@/services/blog";
import UpdatePostForm from "./update-post-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const PostEditor = () => {
  const { id } = useParams();
  const router = useNavigate();

  const { data: post } = useQuery(["postData", id], () => postData(id || ""));

  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (!open) router("/admin/posts")
      }}
    >
      <DialogContent className="p-0 max-w-screen-2xl">
        <Head title={`${post?.title} | Editor publicación`} />
        <ScrollArea className="h-screen">{post && <UpdatePostForm post={post} />}</ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PostEditor;
