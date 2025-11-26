import {url} from "../index.ts";

import {Video} from "../../types/video.ts";

export const apiGetAllVideos = async () => {
    const response = await fetch(`${url}/videos`);

    const data: Video[] = await response.json();

    return data
}

export const apiGetVideoByTitle = async (title: string) => {
    const response = await fetch(`${url}/videos/?name=${title}`);

    const data: Video[] = await response.json();

    return data
}