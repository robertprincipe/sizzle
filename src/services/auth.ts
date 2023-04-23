import API from "@/lib/api";
import { IUser } from "@/types/iuser";

export const login = (data: IUser) => API.post("/auth/login", data);

export const signup = (data: IUser) => API.post("/auth/signup", data);

export const logout = () => API.post("/auth/logout");