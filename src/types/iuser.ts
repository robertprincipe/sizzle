export enum ROLES {
    ADMIN = "ADMIN",
    USER = "USER",
    MODERATOR = "MODERATOR",
    EDITOR = "EDITOR",
}

export interface IUser {
    id?: string;
    username: string;
    email: string;
    profile_info?: string;
    picture?: Blob | string;
    banner?: Blob | string;
    token?: string;
    role?: ROLES;
    password?: string;
    re_password?: string;
}