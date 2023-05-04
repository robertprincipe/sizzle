import PostEditor from "@/components/organisms/PostEditor";
import { postData } from "@/services/blog";
import { IPost } from "@/types/iblog";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditPostPage = () => {
  const { id } = useParams();
  const { data } = useQuery(["postData", id], () => postData(id || ""), {
    cacheTime: 0,
    staleTime: 0,
  });
  // const [data, setData] = useState<IPost>();
  // useEffect(() => {
  //   postData(id || "").then((res) => setData(res.data));
  // }, []);

  return <PostEditor preDataFill={data?.data} />;
};

export default EditPostPage;
