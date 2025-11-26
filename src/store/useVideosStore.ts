import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Video} from "../types/video.ts";

interface VideoState {
    allVideos: Video[];
    searchVideos: Video[];
}

const initialState: VideoState = {
    allVideos: [],
    searchVideos: [],
}

export const videosStore = createSlice({
    name: "videosStore",

    initialState,

    reducers: {
        setVideos: (state, action: PayloadAction<any[]>) => {
            state.allVideos = action.payload
        },
        setSearchVideos: (state, action: PayloadAction<Video[]>) => {
            state.searchVideos = action.payload
        }
    }
})

export const {
    setVideos,
    setSearchVideos
} = videosStore.actions
export default videosStore.reducer