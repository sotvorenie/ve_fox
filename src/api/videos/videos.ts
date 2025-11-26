import {Video} from "../../types/video.ts";

export const apiGetAllVideos = async () => {
    const response = await fetch('http://localhost:5557/videos');

    const data: Video[] = await response.json();

    return data
}