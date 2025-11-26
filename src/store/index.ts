import {configureStore} from "@reduxjs/toolkit";

import searchReducer from "./useSearchStore.ts";
import videosReducer from "./useVideosStore.ts";
import videoReducer from "./useVideoStore.ts";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        videos: videosReducer,
        video: videoReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch