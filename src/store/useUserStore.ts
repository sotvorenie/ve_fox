import {create} from "zustand";

import {User, UserWithToken} from "@/types/user";

import {apiCheckMe} from "@api/auth/auth";

interface UserState {
    isLogged: boolean
    user: User
    token: string

    routerMap: string[]
    currentIndex: number

    setUser: (user: User) => void
    setToken: (token: string) => void
    setIsLogged: (isLogged: boolean) => void

    videoSeed: number

    setRouterMap: (map: string[]) => void
    addRoute: (path: string) => void
    goBack: () => string | null
    goForward: () => string | null

    setVideoSeed: (seed: number) => void

    logIn: (data: UserWithToken) => void
    logOut: () => void
    checkMe: () => Promise<void>
}

const emptyUser: User = {
    id: -1,
    name: '',
    avatar_url: '',
    router_map: []
}

export const useUserStore = create<UserState>((set, get) => ({
    isLogged: false,
    user: emptyUser,
    token: '',

    routerMap: [],
    currentIndex: -1,

    videoSeed: 0,

    setUser: (user: User) => set({user}),
    setToken: (token: string) => set({token}),
    setIsLogged: (isLogged: boolean) => set({isLogged}),

    setRouterMap: (routerMap: string[]) => set({
        routerMap,
        currentIndex: routerMap.length - 1
    }),
    addRoute: (path) => set((state) => {
        if (state.routerMap[state.currentIndex] === path) return state

        const newStack = [...state.routerMap.slice(0, state.currentIndex + 1), path]
        return {
            routerMap: newStack,
            currentIndex: newStack.length - 1
        }
    }),
    goBack: () => {
        const { currentIndex, routerMap } = get()
        if (currentIndex > 0) {
            const nextIndex = currentIndex - 1
            set({ currentIndex: nextIndex })
            return routerMap[nextIndex]
        }
        return '/main'
    },
    goForward: () => {
        const { currentIndex, routerMap } = get()
        if (currentIndex < routerMap.length - 1) {
            const nextIndex = currentIndex + 1
            set({ currentIndex: nextIndex })
            return routerMap[nextIndex]
        }
        return null
    },

    setVideoSeed: (seed: number) => set({ videoSeed: seed }),

    logIn: (data: UserWithToken) => {
        localStorage.setItem("token", data.token)
        set({
            user: data.user,
            token: data.token,
            isLogged: true
        })
    },
    logOut: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('router-map')
        localStorage.removeItem('has-router-map')
        set({
            user: {
                id: -1,
                name: '',
                avatar_url: '',
                router_map: []
            },
            isLogged: false,
            token: ''
        })
    },
    checkMe: async () => {
        const token: string = localStorage.getItem("token") || ''
        if (!token) {
            set({isLogged: false})
            return
        }
        try {
            const data: UserWithToken = await apiCheckMe()
            get().logIn(data)
        } catch (err) {
            console.error(err)
            set({isLogged: false})
        }
    }
}))