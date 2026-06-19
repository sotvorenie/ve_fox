import {Channel, ChannelsListResponse} from "../../types/channel.ts";
import {VideosList} from "../../types/video.ts";
import {SectionResponse} from "../../types/section.ts";
import {SuccessResponse} from "../../types/success.ts";

import {apiFetch} from "../index.ts";

export const apiGetChannel = (id: number): Promise<Channel> => {
    return apiFetch(`/channel/${id}`)
}

export const apiGetVideosFromChannel = (
    id: number,
    page: number,
    isNew: boolean = true
):Promise<VideosList> => {
    return apiFetch(`/channel/${id}/videos?page=${page}&is_new=${isNew}`)
}

export const apiGetChannels = (): Promise<ChannelsListResponse> => {
    return apiFetch('/channel/all')
}

export const apiGetChannelSections = (channelId: number): Promise<SectionResponse> => {
    return apiFetch(`/channel/${channelId}/sections`)
}

export const apiCheckHasChannelSections = (channelId: number): Promise<SuccessResponse> => {
    return apiFetch(`/channel/${channelId}/has_sections`)
}