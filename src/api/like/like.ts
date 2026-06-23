import {LikeResponse} from "../../types/like.ts";
import {VideosList} from "../../types/video.ts";

import {apiGet} from "../index.ts";

export const apiLike = (videoId: number): Promise<LikeResponse> => {
    return apiGet(`/like/${videoId}`)
}

export const apiCheckIsLiked = (videoId: number): Promise<LikeResponse> => {
    return apiGet(`/like/is_like/${videoId}`)
}

export const apiGetListLikes = (page: number = 1, limit: number = 21): Promise<VideosList> => {
    return apiGet(`/like/all?page=${page}&limit=${limit}`)
}