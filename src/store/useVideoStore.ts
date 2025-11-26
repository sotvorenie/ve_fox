import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Video} from "../types/video.ts";

interface VideoState {
    video: Video;
}

const initialState: VideoState = {
    video: {name: '', video: '', channel: '', date: ''},
}

export const videoStore = createSlice({
    name: "videoStore",

    initialState,

    reducers: {
        setVideo: (state, action: PayloadAction<Video>) => {
            state.video = action.payload
        }
    }
})

export const {setVideo} = videoStore.actions
export default videoStore.reducer