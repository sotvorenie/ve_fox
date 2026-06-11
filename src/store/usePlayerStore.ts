import {create} from "zustand";

interface PlayerState {
    isPlaying: boolean
    volume: number
    isShowSettings: boolean
    isShowControls: boolean
    duration: number
    currentTime: number
    isSubtitlesActive: boolean
    subtitlesText: string
    isFullscreen: boolean

    setIsPlaying: (value: boolean) => void
    toggleIsPlaying: () => void
    setVolume: (volume: number) => void
    setDuration: (duration: number) => void
    setCurrentTime: (currentTime: number) => void
    setSubtitlesActive: (value: boolean) => void
    setSubtitlesText: (text: string) => void
    setIsShowSettings: (value: boolean) => void
    setIsShowControls: (value: boolean) => void
    setIsFullscreen: (value: boolean) => void
    toggleIsFullscreen: (value: boolean) => void

    clearData: () => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
    isPlaying: false,
    volume: 1,
    isShowSettings: false,
    isShowControls: true,
    duration: 0,
    currentTime: 0,
    isSubtitlesActive: false,
    subtitlesText: "",
    isFullscreen: false,

    setIsPlaying: (value: boolean) => set({isPlaying: value}),
    toggleIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
    setVolume: (volume: number) => set({volume: volume}),
    setDuration: (duration: number) => set({duration: duration}),
    setCurrentTime: (currentTime: number) => set({currentTime: currentTime}),
    setSubtitlesActive: (value: boolean) => set({isSubtitlesActive: value}),
    setSubtitlesText: (text: string) => set({subtitlesText: text}),
    setIsShowSettings: (value: boolean) => set({isShowSettings: value}),
    setIsShowControls: (value: boolean) => set({isShowControls: value}),
    setIsFullscreen: (value: boolean) => set({isFullscreen: value}),
    toggleIsFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
    clearData: () => {
        set({
            isPlaying: true,
            currentTime: 0,
            subtitlesText: '',
            isShowControls: true,
            isShowSettings: false
        })
    },
}))