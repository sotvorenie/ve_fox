import {url} from "../index.ts";

import {Video} from "../../types/video.ts";

interface ResponseData {
    total: number;
    page: number;
    limit: number;
    videos: Video[]
}

export const apiGetVideosFromChannel = async (channel: string, page: number):Promise<ResponseData> => {
    const response = await fetch(`${url}/channel/${channel}/videos?page=${page}&limit=20`)

    const data: ResponseData = await response.json();

    return data
}