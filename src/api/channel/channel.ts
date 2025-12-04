import {url} from "../index.ts";

import {ResponseVideos} from "../../types/responseVideos.ts";
import {Channel} from "../../types/channel.ts";

export const apiGetChannel = async (channel: string): Promise<Channel> => {
    const response = await fetch(`${url}/channel/${channel}`);

    return await response.json()
}

export const apiGetVideosFromChannel = async (
    channel: string,
    page: number,
    isNew: boolean = true
):Promise<ResponseVideos> => {
    const response =
        await fetch(`${url}/channel/${channel}/videos?page=${page}&limit=20&is_new=${isNew}`)

    return await response.json()
}