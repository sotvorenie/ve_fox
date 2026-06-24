import {Channel, ChannelsListResponse} from "@/types/channel";
import {VideosList} from "@/types/video";
import {Section, SectionResponse} from "@/types/section";
import {SuccessResponse} from "@/types/success";

import {apiGet, apiPost} from "@api/index";

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