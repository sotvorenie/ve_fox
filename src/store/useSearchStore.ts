import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Video} from "../types/video.ts";
import {ResponseVideos} from "../types/responseVideos.ts";

interface Search extends Omit<ResponseVideos, "limit">{
    searchTitle: string;
}

const initialState: Search = {
    searchTitle: '',

    page: 1,
    has_more: false,
    total: 0,
    videos: []
}

export const searchStore = createSlice({
    name: "searchStore",

    initialState,

    reducers: {
        setSearchTitle: (state, action: PayloadAction<string>) => {
            state.searchTitle = action.payload
        },
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
    setSearchTitle,
    setVideos,
    setTotal,
    setPage,
    setHasMore,
} = searchStore.actions
export default searchStore.reducer;