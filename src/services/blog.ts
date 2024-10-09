import API from "@/lib/api";
import { makeSlug, readingTime } from "@/lib/strings";
import { IComment, IPost, IReaction, IReactionList, ITag } from "@/types/iblog";

export const postCreate = (data: IPost) =>
    API.post<IPost>("/posts/create", data);

export const patchPost = (post: IPost) => {
    const formData = new FormData();
    console.log(post.cover_image)
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("slug", post.slug ? post.slug : makeSlug(post.title, "-"));
    formData.append("tags", JSON.stringify(post.tags));
    formData.append("published", JSON.stringify(post.published));

    if (post.cover_image !== undefined || post.cover_image === null) {
        formData.append("cover_image", post.cover_image === null ? "" : post.cover_image)
    }
    console.log(readingTime(post.content));

    formData.append("reading_time", JSON.stringify(readingTime(post.content)))

    return API.patch<IPost>(`/posts/${post.id}/patch`, formData)
};

export const deletePost = (id: string) =>
    API.delete(`/posts/${id}/delete`)

export const deleteImagePost = (id: string) =>
    API.delete(`/posts/${id}/remove-image`)

export const allPosts = () =>
    API.get<IPost[]>('/posts').then(res => res.data)

export const allTags = () =>
    API.get<ITag[]>('/tags').then(res => res.data)
export const tagDetail = (name: string) =>
    API.get<ITag>(`/tags/${name}`)
        .then(res => res.data);

export const editorPosts = () =>
    API.get<IPost[]>('/posts/editor/all')
        .then(res => res.data)

export const postDetail = (slug: string) =>
    API.get<IPost>(`/posts/${slug}`)
        .then(res => res.data)

export const postData = (id: string) =>
    API.get<IPost>(`/posts/${id}/edit`)
        .then(res => res.data)

export const commentPost = (comment: IComment) =>
    API.post<IComment>(`/comments`, comment)
        .then(res => res.data)

export const commentsPost = (postId: string) =>
    API.get<IComment[]>(`/comments/${postId}`)
        .then(res => res.data)

export const updateCommentPost = (comment: IComment) =>
    API.put<IComment>(`/comments/${comment.id}/update`, comment)
        .then(res => res.data)

export const deleteCommentPost = (id: string) =>
    API.delete(`/comments/${id}/delete`)

export const reactPost = (post_id: string, emoji: string) =>
    API.put(`/react/post`, {
        post_id,
        emoji
    }).then(res => res.data)

export const reactsPost = (post_id: string) =>
    API.get<IReaction[]>(`/reactions/post/${post_id}`)
        .then(res => res.data)

export const reactionList = (post_id: string) =>
    API.get<IReactionList>(`/reaction-list/post/${post_id}`)
        .then(res => res.data)

export const reactionUser = (post_id: string) =>
    API.get<IReaction>(`/react/user/post/${post_id}`)
        .then(res => res.data)

export const userReaction = (post_id: string) =>
    API.get<{ user_reaction: string, count: number }>(`/reaction/user/${post_id}`)
        .then(res => res.data)

export const searchTags = (query: string) =>
    API.get<ITag[]>(`/tags/search?query=${query}`)
        .then(res => res.data)
