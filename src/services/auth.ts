import API from "@/lib/api";
import { IUser } from "@/types/iuser";

export const login = (username: string, password: string) =>
    API.post<{ access: string, refresh: string }>("/auth/jwt/create/", { username, password });

export const signup = (data: IUser) => API.post("/auth/users/", data);

export const activation = ({ uid, access }: { uid: string, access: string }) => API.post("/auth/users/activation/", { uid, token: access });

export const me = () => API.get("/auth/users/me/");

export const check_authenticated = (access: string) => API.post('/auth/jwt/verify/', { token: access })

export const refresh_access = (refresh: string) => API.post('/auth/jwt/refresh/', { refresh });

export const resetPassword = (email: string) => API.post(`/auth/users/reset_password/`, { email })

export const resendActivation = (email: string) => API.post(`/auth/users/resend_activation/`, { email })

export const resetPasswordConfirm = (uid: string, access: string, new_password: string, re_new_password: string) =>
    API.post(`/auth/users/reset_password_confirm/`, {
        uid,
        access,
        new_password,
        re_new_password,
    })