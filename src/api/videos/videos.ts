import {url} from "../index.ts";

import {ResponseVideos} from "../../types/responseVideos.ts";


export const apiGetAllVideos = async () => {
    const response = await fetch(`${url}/all_videos`);

    const data: ResponseVideos = await response.json();

    return data
}