import { login, logout, signup } from "@/services/auth";
import { IUser } from "@/types/iuser";
import { create } from "zustand";
import { persist } from 'zustand/middleware'

type State = {
    user?: IUser;
    token?: string;
    isAuthenticated: boolean;
}

type Action = {
    login: (data: IUser) => void;
    signup: (data: IUser) => void;
    logout: () => void;
}

export const useAuthStore = create(
    persist<State & Action>((set) => ({
        user: undefined,
        isAuthenticated: false,
        login: async (data: IUser) => {
            const { data: loginData } = await login(data)
            set({ user: data, isAuthenticated: true, token: loginData })
        },
        signup: async (data: IUser) => {
            await signup(data)
        },
        logout: async () => {
            await logout()
        }
    }), {
        name: 'Auth'
    }
    ))

