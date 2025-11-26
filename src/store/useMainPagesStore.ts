import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {MainPages} from "../types/mainPages.ts";

interface VideoState {
    pageName: string;
    pageList: MainPages;
}

const initialState: VideoState = {
    pageName: "home",
    pageList: {
        home: 'home',
        search: 'search',
        channel: 'channel',
    }
}

export const mainPagesStore = createSlice({
    name: "mainPagesStore",

    initialState,

    reducers: {
        setPageName: (state, action: PayloadAction<string>) => {
            state.pageName = action.payload
        }
    }
})

export const {
    setPageName
} = mainPagesStore.actions
export default mainPagesStore.reducer