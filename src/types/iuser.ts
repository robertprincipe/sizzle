export interface IUser {
    id?: number;
    username: string;
    email: string;
    token?: string;
    password?: string;
    re_password?: string;
}