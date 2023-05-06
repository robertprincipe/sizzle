import API from "@/lib/api";
import { IUser } from "@/types/iuser";

export const updateUser = (user: IUser) => {
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("profile_info", user.profile_info || '');
    formData.append("picture", typeof user.picture === "object" ? user.picture : 'undefined');
    formData.append("banner", typeof user.banner === "object" ? user.banner : 'undefined');

    return API.put<IUser>(`/users/${user.id}/update_profile`, formData)
};

export const removeImageProfileUser = (id: string, image: "picture" | "banner") =>
    API.delete(`/users/${id}/${image}/remove`)

export const profileUser = (username: string) =>
    API.get<IUser>(`/users/${username}/profile`).then(res => res.data)