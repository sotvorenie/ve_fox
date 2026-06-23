import {SuccessResponse} from "../../types/success.ts";
import {VideosList} from "../../types/video.ts";

import {apiGet} from "../index.ts";

export const apiSetToHistory = (videoId: number): Promise<SuccessResponse> => {
    return apiGet(`/history/set_to_history/${videoId}`)
}

export const apiGetHistory = (page: number = 1, limit: number = 21): Promise<VideosList> => {
    return apiGet(`/history/all?page=${page}&limit=${limit}`)
}