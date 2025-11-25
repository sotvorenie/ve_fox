import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const searchStore = createSlice({
    name: 'searchStore',

    initialState: {
        searchName: '',
    },

    reducers: {
        setSearchName: (state, action: PayloadAction<string>) => {
            state.searchName = action.payload
        },
        clearSearchName: (state): void => {
            state.searchName = ''
        },
    }
})

export const {setSearchName, clearSearchName} = searchStore.actions
export default searchStore.reducer