import {url} from "../index.ts";

import {ResponseVideos} from "../../types/responseVideos.ts";

export const apiGetVideoByTitle = async (title: string) => {
    const response = await fetch(`${url}/search/?name=${title}`);

    const data: ResponseVideos = await response.json();

    return data
}