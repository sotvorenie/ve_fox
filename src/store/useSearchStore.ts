import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Video} from "../types/video.ts";

interface SearchState {
    search: string;

    videos: Video[],

    total: number;
    hasMore: boolean;
    page: number;
}

const initialState: SearchState = {
    search: '',

    videos: [],

    total: 0,
    hasMore: false,
    page: 1,
}

export const searchStore = createSlice({
    name: "searchStore",

    initialState,

    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
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
            state.hasMore = action.payload
        }
    }
})

export const {
    setSearch,
    setVideos,
    setPage,
    setTotal,
    setHasMore
} = searchStore.actions
export default  searchStore.reducer