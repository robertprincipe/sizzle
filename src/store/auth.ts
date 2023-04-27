import { toastError } from "@/lib/errors";
import { check_authenticated, login, me, refresh_access, signup } from "@/services/auth";
import { IUser } from "@/types/iuser";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
    user?: IUser;
    access?: string;
    refresh?: string;
    isAuthenticated: boolean;
    login: (username: string, password: string) => void;
    signup: (data: IUser) => void;
    me: () => void;
    logout: () => void;
    check_authenticated: () => void;
    refresh_access: () => void;
}

const initialState = {
    isAuthenticated: false,
    access: undefined,
    refresh: undefined,
    user: undefined,
};

export const useAuthStore = create(
    persist<AuthState>((set, get) => ({
        ...initialState,
        login: async (username: string, password: string) => {
            try {
                const { data } = await login(username, password)
                set({ isAuthenticated: true, access: data.access, refresh: data.refresh })
                get().me()
            } catch (error) {
                toastError(error)
                set({ ...initialState })
            }
        },
        signup: async (data: IUser) => {
            try {
                await signup(data)
            } catch (error) {
                toastError(error)
            }
        },
        logout: () => {
            set({ ...initialState })
        },
        me: async () => {
            if (!get().access) return;
            try {
                const { data } = await me()
                set({ user: data })
            } catch (err) {
                set({ user: undefined })
            }
        },
        check_authenticated: async () => {
            if (!get().access) return;
            try {
                const { status } = await check_authenticated(get().access || '')
                if (status === 200) set({ isAuthenticated: true })
            } catch (err) {
                set({ ...initialState })
            }
        },
        refresh_access: async () => {
            if (!get().refresh) return;
            try {
                const { data } = await refresh_access(get().refresh || '')
                set({ access: data.access })
            } catch (err) {
                set({ ...initialState })
            }
        },

    }), {
        name: 'Auth',
    }))


/*
         * maick
         * gi5o3o2i9
         * danza
         * EgIIAg%253D%253D
         */