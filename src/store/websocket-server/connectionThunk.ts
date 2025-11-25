import {createAsyncThunk} from "@reduxjs/toolkit";
import {wsManager} from "./WebSocketManager.ts";

export const connectToServer =  createAsyncThunk(
    'connectionStore/connectToServer',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            wsManager.init(dispatch)
            await wsManager.connect()
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)