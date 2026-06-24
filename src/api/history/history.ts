import {SuccessResponse} from "@/types/success";
import {VideosList} from "@/types/video";

import {apiGet} from "@api/index";

export const apiSetToHistory = (videoId: number): Promise<SuccessResponse> => {
    return apiGet(`/history/set_to_history/${videoId}`)
}

export const apiGetHistory = (page: number = 1, limit: number = 21): Promise<VideosList> => {
    return apiGet(`/history/all?page=${page}&limit=${limit}`)
}