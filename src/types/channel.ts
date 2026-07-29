export interface ChannelForList {
    id: number
    name: string
    avatarUrl: string
}

export interface Channel extends ChannelForList {
    path: string
    date: string
}

export interface ChannelsListResponse {
    channels: ChannelForList[]
    total: number
}