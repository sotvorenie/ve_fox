import {Video, VideosList} from "../../types/video.ts";

import {apiFetch} from "../index.ts";


export const apiGetVideo = async (id: number): Promise<Video> => {
    return await apiFetch(`/video/${id}`)
}

export const apiGetAllVideos = async (page: number = 1, limit: number = 21, seed: number = 0.5): Promise<VideosList> => {
    return await apiFetch(`/video/all?page=${page}&limit=${limit}&seed=${seed}`)
}

export const apiGetRecommendedVideos = async (video_id: number, page: number = 1, limit: number = 21): Promise<VideosList> => {
    return await apiFetch(`/video/recommended/${video_id}?page=${page}&limit=${limit}`)
}