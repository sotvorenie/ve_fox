import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Video} from "../types/video.ts";

interface VideoState {
    allVideos: Video[];
}

const initialState: VideoState = {
    allVideos: [],
}

export const videosStore = createSlice({
    name: "videosStore",

    initialState,

    reducers: {
        setVideos: (state, action: PayloadAction<any[]>) => {
            state.allVideos = action.payload
        }
    }
})

export const {setVideos} = videosStore.actions
export default videosStore.reducer