import { ITag } from "./tag";

export interface IPost {
    id?: string;
    title: string;
    slug?: string;
    content?: string;
    cover_image?: Blob | string;
    tags?: ITag[];
    created_at?: Date;
    updated_at?: Date;
}