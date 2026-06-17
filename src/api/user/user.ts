import {SuccessResponse} from "../../types/success.ts";
import {UserAvatar} from "../../types/user.ts";

import {apiPost} from "../index.ts";


export const apiRedactUserName = (name: string): Promise<SuccessResponse> => {
    return apiPost('/user/redact_name', {name})
}

export const apiCheckUserPassword = (password: string): Promise<SuccessResponse> => {
    return apiPost('/user/check_password', {password})
}

export const apiRedactUserPassword = (password: string): Promise<SuccessResponse> => {
    return apiPost('/user/redact_password', {password})
}

export const apiRedactUserAvatar = (file: File): Promise<UserAvatar> => {
    const formData = new FormData();
    formData.append('file', file);

    return apiPost(`/user/redact_avatar`, formData)
}