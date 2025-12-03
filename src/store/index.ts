import {configureStore} from "@reduxjs/toolkit";

import videoReducer from "./useVideoStore.ts";
import searchReducer from "./useSearchStore.ts";

export const store = configureStore({
    reducer: {
        video: videoReducer,
        search: searchReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch