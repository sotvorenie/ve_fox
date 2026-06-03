import {SuccessResponse} from "../../types/success.ts";
import {SaveTime} from "../../types/saveTime.ts";

import {apiFetch} from "../index.ts";

export const apiSaveTime = async (videoId: number, time: number): Promise<SuccessResponse> => {
    return await apiFetch(`/save_time/${videoId}?time=${time}`)
}

export const apiGetSavedTime = async (videoId: number): Promise<SaveTime> => {
    return await apiFetch(`/save_time/get/${videoId}`)
}