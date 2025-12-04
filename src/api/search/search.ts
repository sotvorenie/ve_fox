import {url} from "../index.ts";

import {ResponseVideos} from "../../types/responseVideos.ts";

export const apiGetVideoByTitle = async (title: string, page: number) => {
    const response = await fetch(`${url}/search/?name=${title}&page=${page}`);

    const data: ResponseVideos = await response.json();

    return data
}