import {configureStore} from "@reduxjs/toolkit";

import videosReducer from "./useVideosStore.ts";
import videoReducer from "./useVideoStore.ts";
import mainPagesReducer from "./useMainPagesStore.ts";
import channelReducer from "./useChannelStore.ts";
import searchReducer from "./useSearchStore.ts";

export const store = configureStore({
    reducer: {
        videos: videosReducer,
        video: videoReducer,
        mainPages: mainPagesReducer,
        channel: channelReducer,
        search: searchReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch