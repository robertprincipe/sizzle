import API from "@/lib/api";
import { IComment, IPost } from "@/types/iblog";
import { number } from "zod";

export const postCreate = (data: IPost) => API.post<IPost>("/posts/create", data);

export const postUpdate = (id: string, data: IPost) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content || '');
    formData.append("cover_image", data.cover_image || '');
    formData.append("tags", JSON.stringify(data.tags || []));
    formData.append("slug", data.slug || '');

    return API.put(`/posts/${id}/update`, formData)
};

export const patchPost = (post: IPost) => {
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content || '');
    if (post.cover_image) formData.append("cover_image", post.cover_image);
    formData.append("tags", JSON.stringify(post.tags));
    formData.append("published", JSON.stringify(post.published));
    formData.append("slug", post.slug || '');

    return API.patch<IPost>(`/posts/${post.id}/patch`, formData)
};

export const deletePost = (id: string) => API.delete(`/posts/${id}/delete`)

export const deleteImagePost = (id: string) => API.delete(`/posts/${id}/remove-image`)

export const allPosts = () => API.get<IPost[]>('/posts')

export const postDetail = (slug: string) => API.get<IPost>(`/posts/${slug}`)

export const postData = (id: string) => API.get<IPost>(`/posts/${id}/edit`)

export const commentPost = (comment: IComment) => API.post<IComment>(`/comments`, comment)

export const commentsPost = (postId: string) => API.get<IComment[]>(`/comments/${postId}`)

export const updateCommentPost = (comment: IComment) =>
    API.put<IComment>(`/comments/${comment.id}/update`, comment)

export const deleteCommentPost = (id: string) =>
    API.delete(`/comments/${id}/delete`)

export const reactPost = (post_id: string, emoji: string) => API.put(`/react/post`, {
    post_id,
    emoji
})

export const reactsPost = (post_id: string) =>
    API.get<[{ id: string, emoji: string }]>(`/reactions/post/${post_id}`)


export const reactionList = (post_id: string) =>
    API.get<{
        reactions: { emoji: string, count: number }[],
        count: number,
        user_reaction: string
    }>(`/reaction-list/post/${post_id}`)
