import {configureStore} from "@reduxjs/toolkit";

import connectionReducer from "./websocket-server/useConnectionStore.ts"
import searchReducer from "./useSearchStore.ts";

export const store = configureStore({
    reducer: {
        connection: connectionReducer,
        search: searchReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch