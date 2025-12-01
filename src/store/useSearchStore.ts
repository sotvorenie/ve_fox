import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Search {
    searchTitle: string;
}

const initialState: Search = {
    searchTitle: '',
}

export const searchStore = createSlice({
    name: "searchStore",

    initialState,

    reducers: {
        setSearchTitle: (state, action: PayloadAction<string>) => {
            state.searchTitle = action.payload
        }
    }
})

export const {setSearchTitle} = searchStore.actions
export default searchStore.reducer;