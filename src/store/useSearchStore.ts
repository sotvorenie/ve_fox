import {create} from "zustand";
import {ChannelForList} from "../types/channel.ts";
import {VideoForList} from "../types/video.ts";
import {SearchResponse} from "../types/search.ts";
import {apiSearch} from "../api/search/search.ts";

interface SearchState {
    value: string
    page: number
    isLoading: boolean
    total: number
    channels: ChannelForList[]
    videos: VideoForList[]
    hasMore: boolean

    setValue: (value: string) => void
    search: () => Promise<void>
}

export const useSearchStore = create<SearchState>((set, get) => ({
    value: '',
    page: 0,
    isLoading: true,
    total: 0,
    channels: [],
    videos: [],
    hasMore: false,

    setValue: (value: string) => set({value}),
    search: async () => {
        try {
            set({isLoading: true})
            const data: SearchResponse = await apiSearch(get().value, get().page)
            if (data) {
                set({
                    channels: data.channels,
                    videos: data.videos,
                    hasMore: data.has_more,
                    total: data.total,
                    page: data.page + 1
                })
            }
        } catch (err) {
            console.error(err)
        } finally {
            set({isLoading: false})
        }
    }
}))