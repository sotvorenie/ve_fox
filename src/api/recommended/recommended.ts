import {url} from "../index.ts";

import {ResponseVideos} from "../../types/responseVideos.ts";

export const apiGetRecommendedVideos = async (name: string, channel: string, page: number = 1): Promise<ResponseVideos> => {
    const response =
        await fetch(`${url}/recommended?name=${name}&channel_name=${channel}&page=${page}`);

    return await response.json()
}