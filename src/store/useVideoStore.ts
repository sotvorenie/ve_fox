import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Video} from "../types/video.ts";

interface VideoState {
    video: Video;
    isLoading: boolean;

    recommendedVideos: Video[],
    recommendedIsLoading: boolean,
    recommendedHasMore: boolean,
}

const initialState: VideoState = {
    video: {name: '', video: undefined, video_path: '', channel: '', date: ''},
    isLoading: true,

    recommendedVideos: [],
    recommendedIsLoading: true,
    recommendedHasMore: false,
}

export const videoStore = createSlice({
    name: "videoStore",

    initialState,

    reducers: {
        setVideo: (state, action: PayloadAction<Video>) => {
            state.video = action.payload
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },

        setRecommendedIsLoading: (state, action: PayloadAction<boolean>) => {
            state.recommendedIsLoading = action.payload
        },
        setRecommendedHasMore: (state, action: PayloadAction<boolean>) => {
            state.recommendedHasMore = action.payload
        },
        setRecommendedVideos: (state, action: PayloadAction<Video[]>) => {
            state.recommendedVideos = action.payload
        }
    }
})

export const {
    setVideo,
    setIsLoading,
    setRecommendedIsLoading,
    setRecommendedVideos,
    setRecommendedHasMore
} = videoStore.actions
export default videoStore.reducer