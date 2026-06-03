import {Token, UserWithToken} from "../../types/auth.ts";

import {apiFetch} from "../index.ts";

export const apiAuth = async (login: string, password: string): Promise<Token> => {
    return await apiFetch(`/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ login, password })
    })
}

export const apiRegister = async (login: string, password: string): Promise<Token> => {
    return await apiFetch(`/auth/register`, {
        method: 'POST',
        body: JSON.stringify({ login, password })
    })
}

export const apiCheckMe = async (): Promise<UserWithToken> => {
    return await apiFetch('/me')
}