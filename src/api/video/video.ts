import {url} from "../index.ts";

import {Video} from "../../types/video.ts";


export const apiGetVideo = async (path: string) => {
    const response = await fetch(`${url}/video?video_path=${path}`);

    const data: Video = await response.json();

    return data
}