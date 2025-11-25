import {createAsyncThunk} from "@reduxjs/toolkit";
import {wsManager} from "./WebSocketManager.ts";

export const sendMessageToServer = createAsyncThunk(
    'connectionStore/sendMessageToServer',
    async (msg: any) => {
        wsManager.send(msg)
    }
)