import {Channel} from "../../types/channel.ts";
import {VideosList} from "../../types/video.ts";

import {apiFetch} from "../index.ts";

export const apiGetChannel = async (id: number): Promise<Channel> => {
    return await apiFetch(`/channel/${id}`)
}

export const apiGetVideosFromChannel = async (
    id: number,
    page: number,
    isNew: boolean = true
):Promise<VideosList> => {
    return await apiFetch(`/channel/${id}/videos?page=${page}&is_new=${isNew}`)
}

export const apiGetChannels = async () => {
    return await apiFetch('/channel/all')
}