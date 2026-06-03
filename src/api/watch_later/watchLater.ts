import {SuccessResponse} from "../../types/success.ts";
import {IsWatchLaterResponse} from "../../types/watchLater.ts";
import {VideosList} from "../../types/video.ts";

import {apiFetch} from "../index.ts";

export const apiCheckWatchLater = async (videoId: number): Promise<IsWatchLaterResponse> => {
    return await apiFetch(`/watch_later/is_watch_later/${videoId}`)
}

export const apiSetWatchLater = async (videoId: number): Promise<SuccessResponse> => {
    return await apiFetch(`/watch_later/${videoId}`)
}

export const apiDeleteFromWatchLater = async (videoId: number): Promise<SuccessResponse> => {
    return await apiFetch(`/watch_later/delete/${videoId}`)
}

export const apiGetListWatchLater = async (page: number = 1, limit: number = 21): Promise<VideosList> => {
    return await apiFetch(`/watch_later/all?page=${page}&limit=${limit}`)
}