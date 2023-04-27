import { Editor } from "@/components/organisms/Editor";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { postDetail } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const EditPostPage = () => {
  const { slug } = useParams();
  const { data, isLoading } = useQuery(["postDetail"], () =>
    postDetail(slug || "")
  );
  return (
    <>
      <Editor preDataFill={data?.data} />
    </>
  );
};

export default EditPostPage;
