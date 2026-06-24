import {SuccessResponse} from "@/types/success";
import {SaveTime} from "@/types/saveTime";

import {apiGet} from "@api/index";

export const apiSaveTime = (videoId: number, time: number): Promise<SuccessResponse> => {
    return apiGet(`/save_time/${videoId}?time=${time}`)
}

export const apiGetSavedTime = (videoId: number): Promise<SaveTime> => {
    return apiGet(`/save_time/get/${videoId}`)
}