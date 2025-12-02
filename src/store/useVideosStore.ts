import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Video} from "../types/video.ts";
import {ResponseVideos} from "../types/responseVideos.ts";

interface VideoState extends Omit<ResponseVideos, "limit">{}

const initialState: VideoState = {
    total: 0,
    page: 1,
    has_more: false,
    videos: [],
}

export const videosStore = createSlice({
    name: "videosStore",

    initialState,

    reducers: {
        setVideos: (state, action: PayloadAction<Video[]>) => {
            state.videos = action.payload
        },

        setTotal: (state, action: PayloadAction<number>) => {
            state.total = action.payload
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setHasMore: (state, action: PayloadAction<boolean>) => {
            state.has_more = action.payload
        },
    }
})

export const {
    setVideos,
    setTotal,
    setPage,
    setHasMore
} = videosStore.actions
export default videosStore.reducer