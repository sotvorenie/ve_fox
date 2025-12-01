import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Video} from "../types/video.ts";

interface Channel {
    channelName: string;
    channelAvatar: string;
    page: number;
    limit: number;
    channelVideos: Video[];
}

const initialState: Channel = {
    channelName: '',
    channelAvatar: '',
    page: 1,
    limit: 20,
    channelVideos: [],
}

export const channelStore = createSlice({
    name: "channelStore",

    initialState,

    reducers: {
        setChannelName: (state, action: PayloadAction<string>) => {
            state.channelName = action.payload
        },
        setChannelAvatar: (state, action: PayloadAction<string>) => {
            state.channelAvatar = action.payload
        },
        setChannelVideos: (state, action: PayloadAction<Video[]>) => {
            state.channelVideos = action.payload
        }
    }
})

export const {
    setChannelName,
    setChannelAvatar,
    setChannelVideos
} = channelStore.actions
export default channelStore.reducer