import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Video} from "../types/video.ts";

interface Search {
    searchTitle: string;
    searchVideos: Video[];
}

const initialState: Search = {
    searchTitle: '',
    searchVideos: [],
}

export const searchStore = createSlice({
    name: "searchStore",

    initialState,

    reducers: {
        setSearchTitle: (state, action: PayloadAction<string>) => {
            state.searchTitle = action.payload
        },
        setSearchVideos: (state, action: PayloadAction<Video[]>) => {
            state.searchVideos = action.payload
        }
    }
})

export const {
    setSearchTitle,
    setSearchVideos
} = searchStore.actions
export default searchStore.reducer;