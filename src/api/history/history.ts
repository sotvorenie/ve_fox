import {VideosList} from "@/types/video";

import {apiGet} from "@api/index";

export const apiGetHistory = (page: number = 1, limit: number = 21): Promise<VideosList> => {
    return apiGet(`/history/all?page=${page}&limit=${limit}`)
}