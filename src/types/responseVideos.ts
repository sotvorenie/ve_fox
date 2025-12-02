import {Video} from "./video.ts";

export interface ResponseVideos {
    total: number;
    page: number;
    limit: number;
    has_more: boolean;
    videos: Video[]
}