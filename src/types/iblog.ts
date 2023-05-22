import { IUser } from "./iuser";

type Image = Blob | string | null | undefined;

export interface ITag {
    id?: string;
    name: string;
    description?: string;
    color?: string;
    bg?: string;
    posts?: IPost[];
}

export interface IPost {
    id?: string;
    author?: IUser;
    title: string;
    slug?: string;
    content?: string | any;
    published?: boolean;
    cover_image?: Blob | string | null;
    reading_time?: number;
    comment_count?: number;
    reaction_count?: number;
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

export interface IReaction {
    id: string;
    emoji: string,
    count: number
}

export interface IReactionList {
    reactions: IReaction[],
    count: number,
    user_reaction: string
}