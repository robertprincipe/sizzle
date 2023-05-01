import Editor from "@/components/organisms/Editor";
import { postData } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const EditPostPage = () => {
  const { id } = useParams();
  const { data } = useQuery(["postData"], () => postData(id || ""));
  return <Editor preDataFill={data?.data} />;
};

export default EditPostPage;
