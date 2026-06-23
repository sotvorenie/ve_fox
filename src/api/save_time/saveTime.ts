import {SuccessResponse} from "../../types/success.ts";
import {SaveTime} from "../../types/saveTime.ts";

import {apiGet} from "../index.ts";

export const apiSaveTime = (videoId: number, time: number): Promise<SuccessResponse> => {
    return apiGet(`/save_time/${videoId}?time=${time}`)
}

export const apiGetSavedTime = (videoId: number): Promise<SaveTime> => {
    return apiGet(`/save_time/get/${videoId}`)
}