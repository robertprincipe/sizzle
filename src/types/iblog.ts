import { IUser } from "./iuser";

export interface ITag {
    id?: string;
    name: string;
    description?: string;
    color?: string;
    bg?: string;
}

export interface IPost {
    id?: string;
    author?: IUser;
    title: string;
    slug?: string;
    content?: string;
    published?: boolean;
    cover_image?: Blob | string;
    reading_time?: number;
    comment_count?: number;
    tags?: ITag[];
    created_at?: Date;
    updated_at?: Date;
}

export interface IComment {
    id?: string;
    user?: IUser;
    content: string;
    parent_id?: string;
    replies?: IComment[];
    post_id?: string;
    created_at?: Date;
}