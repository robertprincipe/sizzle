import { IUser } from "./iuser";

export interface ITag {
    id?: number;
    name: string;
    description?: string;
    color?: string;
    bg?: string;
}

export interface IPost {
    id?: number;
    title: string;
    slug?: string;
    content?: string;
    cover_image?: Blob | string;
    comment_count?: number;
    tags?: ITag[];
    created_at?: Date;
    updated_at?: Date;
}

export interface IComment {
    id?: number;
    user?: IUser;
    content: string;
    parent_id?: number;
    replies?: IComment[];
    post_id?: number;
    created_at?: Date;
}