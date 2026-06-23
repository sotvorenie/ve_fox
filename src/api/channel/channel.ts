import {Channel, ChannelsListResponse} from "../../types/channel.ts";
import {VideosList} from "../../types/video.ts";
import {Section, SectionResponse} from "../../types/section.ts";
import {SuccessResponse} from "../../types/success.ts";

import {apiGet, apiPost} from "../index.ts";

export const apiGetChannel = (id: number): Promise<Channel> => {
    return apiGet(`/channel/${id}`)
}

export const apiGetVideosFromChannel = (
    id: number,
    page: number,
    isNew: boolean = true
):Promise<VideosList> => {
    return apiGet(`/channel/${id}/videos?page=${page}&is_new=${isNew}`)
}

export const apiGetChannels = (): Promise<ChannelsListResponse> => {
    return apiGet('/channel/all')
}

export const apiGetChannelSections = (channelId: number): Promise<SectionResponse> => {
    return apiGet(`/channel/${channelId}/sections`)
}

export const apiCheckHasChannelSections = (channelId: number): Promise<SuccessResponse> => {
    return apiGet(`/channel/${channelId}/has_sections`)
}

export const apiCreateNewSection = (channelId: number, section_name: string):Promise<Section> => {
    return apiPost(`/channel/${channelId}/create_section`, {section_name})
}