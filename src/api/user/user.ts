import {SuccessResponse} from "../../types/success.ts";
import {UserAvatar} from "../../types/user.ts";

import {apiPost} from "../index.ts";


export const apiRedactUserData = (name: string, login: string): Promise<SuccessResponse> => {
    return apiPost('/user/redact_data', {name, login})
}

export const apiRedactUserAvatar = (file: File): Promise<UserAvatar> => {
    const formData = new FormData();
    formData.append('file', file);

    return apiPost(`/user/redact_avatar`, formData)
}