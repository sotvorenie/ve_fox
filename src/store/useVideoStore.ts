import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Video} from "../types/video.ts";

interface VideoState {
    video: Video;
    videoHistory: Video[];
    activeVideoFromHistory: number;
}

const initialState: VideoState = {
    video: {name: '', video: undefined, video_path: '', channel: '', date: ''},
    videoHistory: [],
    activeVideoFromHistory: 0,
}

export const videoStore = createSlice({
    name: "videoStore",

    initialState,

    reducers: {
        setVideo: (state, action: PayloadAction<Video>) => {
            state.video = action.payload
        },
        setVideoHistory: (state, action: PayloadAction<Video>) => {
            state.videoHistory.push(action.payload)
        },
        setActiveVideoFromHistory: (state, action: PayloadAction<number>) => {
            state.activeVideoFromHistory = action.payload
        },
        clearVideoHistory: (state) => {
            state.videoHistory = []
        }
    }
})

export const {
    setVideo,
    setVideoHistory,
    setActiveVideoFromHistory,
    clearVideoHistory,
} = videoStore.actions
export default videoStore.reducer