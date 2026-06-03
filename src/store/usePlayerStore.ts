import {create} from "zustand";

interface PlayerState {
    isMiniPlayer: boolean

    isPlaying: boolean
    volume: number
    isShowSettings: boolean
    isShowControls: boolean
    duration: number
    currentTime: number
    isSubtitlesActive: boolean
    subtitlesText: string
    isFullscreen: boolean

    setIsMiniPlayer: (value: boolean) => void

    setIsPlaying: (value: boolean) => void
    setVolume: (volume: number) => void
    setDuration: (duration: number) => void
    setCurrentTime: (currentTime: number) => void
    setSubtitlesActive: (value: boolean) => void
    setSubtitlesText: (text: string) => void
    setIsShowSettings: (value: boolean) => void
    setIsShowControls: (value: boolean) => void
    setIsFullscreen: (value: boolean) => void

    clearData: () => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
    isMiniPlayer: false,
    isPlaying: false,
    volume: 1,
    isShowSettings: false,
    isShowControls: true,
    duration: 0,
    currentTime: 0,
    isSubtitlesActive: false,
    subtitlesText: "",
    isFullscreen: false,

    setIsMiniPlayer: (value: boolean) => set({isMiniPlayer: value}),
    setIsPlaying: (value: boolean) => set({isPlaying: value}),
    setVolume: (volume: number) => set({volume: volume}),
    setDuration: (duration: number) => set({duration: duration}),
    setCurrentTime: (currentTime: number) => set({currentTime: currentTime}),
    setSubtitlesActive: (value: boolean) => set({isSubtitlesActive: value}),
    setSubtitlesText: (text: string) => set({subtitlesText: text}),
    setIsShowSettings: (value: boolean) => set({isShowSettings: value}),
    setIsShowControls: (value: boolean) => set({isShowControls: value}),
    setIsFullscreen: (value: boolean) => set({isFullscreen: value}),
    clearData: () => {
        get().setIsMiniPlayer(false)
        get().setIsPlaying(true)
        get().setCurrentTime(0)
        get().setSubtitlesText('')
        get().setIsShowControls(true)
        get().setIsShowSettings(false)
    },
}))