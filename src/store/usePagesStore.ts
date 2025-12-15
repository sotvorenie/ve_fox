import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PagesState {
    page: number
}

const initialState: PagesState = {
    page: -1,
}

export const pagesStore = createSlice({
    name: "pagesStore",

    initialState,

    reducers: {
        setRouterPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        }
    }
})

export const {setRouterPage} = pagesStore.actions
export default pagesStore.reducer