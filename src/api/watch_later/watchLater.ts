import {SuccessResponse} from "../../types/success.ts";
import {IsWatchLaterResponse} from "../../types/watchLater.ts";
import {VideosList} from "../../types/video.ts";

import {apiGet} from "../index.ts";

export const apiCheckWatchLater = (videoId: number): Promise<IsWatchLaterResponse> => {
    return apiGet(`/watch_later/is_watch_later/${videoId}`)
}

export const apiSetWatchLater = (videoId: number): Promise<SuccessResponse> => {
    return apiGet(`/watch_later/${videoId}`)
}

export const apiDeleteFromWatchLater = (videoId: number): Promise<SuccessResponse> => {
    return apiGet(`/watch_later/delete/${videoId}`)
}

export const apiGetListWatchLater = (page: number = 1, limit: number = 21): Promise<VideosList> => {
    return apiGet(`/watch_later/all?page=${page}&limit=${limit}`)
}