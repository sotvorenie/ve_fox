import {createSlice} from "@reduxjs/toolkit";
import { connectToServer } from "./connectionThunk";

export const connectionStore = createSlice({
    name: 'connectionStore',

    initialState: {
        // активно когда идет подключение
        isConnecting: false,
        // активно когда подключено
        isConnected: false,
        // текст ошибки подключения
        connectionError: '',
    },

    reducers: {
        connected: (state) => {
            state.isConnected = true;
            state.isConnecting = false;
            state.connectionError = "";
        },
        disconnected: (state) => {
            state.isConnected = false;
        },
        error: (state, action) => {
            state.isConnecting = false;
            state.isConnected = false;
            state.connectionError = action.payload;
        },
        message: (_, action) => {
            console.log("WS message:", action.payload)
        }
    },

    extraReducers: (builder) => {
        builder.addCase(connectToServer.pending, (state) => {
            state.isConnecting = true
            state.isConnected = false
            state.connectionError = ''
        })
        builder.addCase(connectToServer.rejected, (state, action) => {
            state.isConnecting = false
            state.connectionError = action.error.message || 'Ошибка'
        })
    }
})

export const {connected, disconnected, error, message} = connectionStore.actions
export default connectionStore.reducer