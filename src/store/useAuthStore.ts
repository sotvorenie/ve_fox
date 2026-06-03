import {create} from "zustand";
import {User, UserWithToken} from "../types/auth.ts";
import {apiCheckMe} from "../api/auth/auth.ts";

interface AuthState {
    isLoggedIn: boolean
    user: User

    login: (token: string) => void
    logout: () => void
    checkMe: () => Promise<void>
}

const emptyUser: User = {
    id: -1,
    username: '',
}

export const useAuthStore = create<AuthState>((set, get) => ({
    isLoggedIn: false,
    user: emptyUser,

    login: (token: string) => {
        localStorage.setItem('token', token)
        set({isLoggedIn: true})
        if (globalThis.location.pathname === '/auth') globalThis.location.href = '/'
    },
    logout: () => {
        localStorage.removeItem('token')
        globalThis.location.href = '/auth'
        set({isLoggedIn: false})
    },
    checkMe: async () => {
        if (globalThis.location.pathname === '/auth') return

        const token = localStorage.getItem('token') || ''
        if (!token) {
            set({isLoggedIn: false})
            return
        }

        try {
            const data: UserWithToken = await apiCheckMe()
            get().login(data.token)
        } catch (err) {
            console.error(err)
            set({isLoggedIn: false})
        }
    }
}))