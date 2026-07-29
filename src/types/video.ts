import {ChannelForList} from "./channel.ts";
import {Meta} from "./meta.ts";

export interface VideoForList {
    id: number
    name: string
    createdAt: string
    duration: number
    url: string
    previewUrl: string
    channel: ChannelForList
    savedTime: number
    viewsCount: number
}

export interface Video {
    id: number
    name: string
    url: string
    createdAt: string
    duration: number
    previewUrl: string
    channel: ChannelForList
    viewsCount: number
    likesCount: number
}

export interface VideoResponse {
    video: Video
    savedTime: number
    isLiked: boolean
    isWatchLater: boolean
}

export interface VideosList extends Meta {
    videos: VideoForList[]
}