import {SuccessResponse} from "@/types/success";

import {apiDelete, apiPost} from "@api/index";

export const apiSaveTime = (videoId: number, time: number): Promise<SuccessResponse> => {
    return apiPost(`/save_time/set/${videoId}`, {time})
}

export const apiDeleteSavedTime = (videoId: number): Promise<SuccessResponse> => {
    return apiDelete(`/save_time/delete/${videoId}`)
}