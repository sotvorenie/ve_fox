import {LikeResponse} from "../../types/like.ts";
import {VideosList} from "../../types/video.ts";

import {apiFetch} from "../index.ts";

export const apiLike = async (videoId: number): Promise<LikeResponse> => {
    return await apiFetch(`/like/${videoId}`)
}

export const apiCheckIsLiked = async (videoId: number): Promise<LikeResponse> => {
    return await apiFetch(`/like/is_like/${videoId}`)
}

export const apiGetListLikes = async (page: number = 1, limit: number = 21): Promise<VideosList> => {
    return await apiFetch(`/like/all?page=${page}&limit=${limit}`)
}