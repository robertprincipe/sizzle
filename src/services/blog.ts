import API from "@/lib/api";
import { IComment, IPost } from "@/types/iblog";

export const postCreate = (data: IPost) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content || '');
    formData.append("cover_image", data.cover_image || '');
    formData.append("tags", JSON.stringify(data.tags || []));
    formData.append("slug", data.slug || '');

    return API.post("/posts/create", formData)
};

export const postUpdate = (id: string, data: IPost) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content || '');
    formData.append("cover_image", data.cover_image || '');
    formData.append("tags", JSON.stringify(data.tags || []));
    formData.append("slug", data.slug || '');

    return API.put(`/posts/${id}/update`, formData)
};

export const deletePost = (id: string) => API.delete(`/posts/${id}/delete`)

export const allPosts = () => API.get<IPost[]>('/posts')

export const postDetail = (slug: string) => API.get<IPost>(`/posts/${slug}`)

export const commentPost = (comment: IComment) => API.post<IComment>(`/comments`, comment)

export const commentsPost = (postId: number) => API.get<IComment[]>(`/comments/${postId}`)