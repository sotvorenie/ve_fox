export interface User {
    id: number
    name: string,
    avatar_url: string,
}

export interface UserWithToken {
    user: User
    token: string
}

export interface Token {
    access_token: string
    token_type: string
}