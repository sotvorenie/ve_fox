import {UserWithToken} from "../../types/auth.ts";

import {apiFetch} from "../index.ts";

export const apiAuth = async (login: string, password: string): Promise<UserWithToken> => {
    return await apiFetch(`/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ login, password })
    })
}

export const apiRegister = async (login: string, password: string, name: string): Promise<UserWithToken> => {
    return await apiFetch(`/auth/register`, {
        method: 'POST',
        body: JSON.stringify({ login, password, name })
    })
}

export const apiCheckMe = async (): Promise<UserWithToken> => {
    return await apiFetch('/auth/me')
}