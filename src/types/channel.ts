import {VideoForList, VideosList} from "@/types/video.ts";

export interface ChannelForList {
    id: number
    name: string
    avatarUrl: string
}

export interface Channel extends ChannelForList {
    url: string
    date: string
}

export interface ChannelResponse {
    channel: Channel
    newVideos: VideosList
    popularVideos: VideoForList[]
}

export interface ChannelsListResponse {
    channels: ChannelForList[]
    total: number
}