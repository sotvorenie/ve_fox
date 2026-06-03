import {SuccessResponse} from "../../types/success.ts";
import {VideosList} from "../../types/video.ts";

import {apiFetch} from "../index.ts";

export const apiSetToHistory = async (videoId: number): Promise<SuccessResponse> => {
    return await apiFetch(`/history/set_to_history/${videoId}`)
}

export const apiGetHistory = async (page: number = 1, limit: number = 21): Promise<VideosList> => {
    return await apiFetch(`/history/all?page=${page}&limit=${limit}`)
}