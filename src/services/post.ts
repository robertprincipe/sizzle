import API from "@/lib/api";
import { IPost } from "@/types/post";

export const postCreate = (data: IPost) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content || '');
    formData.append("cover_image", data.cover_image || '');
    formData.append("tags", JSON.stringify(data.tags || []));
    formData.append("slug", data.slug || '');

    return API.post("/posts/create", formData)
};

export const allPosts = () => API.get<IPost[]>('/posts/')

export const postDetail = (slug: string) => API.get<IPost>(`/posts/${slug}`)