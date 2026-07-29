export interface UserBase {
    id: number
    name: string
    avatarUrl: string
}

export interface User extends UserBase {
    routerMap: string[]
    searchHistory: string[]
}

export interface UserWithToken {
    user: User
    token: string
}

export interface Token {
    accessToken: string
    tokenType: string
}

export interface UserAvatar {
    newAvatarUrl: string
}

export interface UserRouterMap {
    routerMap: string
}