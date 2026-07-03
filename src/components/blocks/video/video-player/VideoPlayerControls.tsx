import React, {useRef, forwardRef, useImperativeHandle} from "react";

import VideoPlayButton from "@video/VideoPlayButton.tsx";

import VideoPlayerLeftButtons from "@video/video-player/VideoPlayerLeftButtons.tsx";
import VideoPlayerRightButtons from "@video/video-player/VideoPlayerRightButtons.tsx";

import {usePlayerStore} from "@store/usePlayerStore.ts";

interface Props {
    setIsShowSettings: (value: any) => void
    setIsMoving: (value: any) => void
    progress: number
    updateVideoTime: (value: any) => void
    videoRef: React.RefObject<HTMLVideoElement | null>
}
export interface ControlsHandles {
    timeline: HTMLDivElement | null;
}

const VideoPlayerControls = forwardRef<ControlsHandles, Props>((props, ref) => {
    const { videoRef, progress, setIsMoving, updateVideoTime, setIsShowSettings } = props
    
    const timelineRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => ({
        timeline: timelineRef.current
    }), [])

    const {isPlaying} = usePlayerStore()

    const mouseDown = (e: MouseEvent | React.MouseEvent) => {
        if (!videoRef.current || !timelineRef.current) return

        setIsMoving(true)
        updateVideoTime(e)
    }

    return (
        <div className={`video-player__controls position-absolute inset-0 hidden`}>
            <VideoPlayButton
                className={`video-player__play-btn absolute-center cursor-default is-active`}
                isPlaying={isPlaying}
                setIsPlaying={(): void => {
                }}
            />

            <div className="video-player__bottom position-absolute flex flex-column w-100 z-1000">
                <div className="video-player__timeline cursor-pointer w-100"
                     ref={timelineRef}
                     style={{'--progress': `${progress}%`} as React.CSSProperties}
                     onMouseDown={mouseDown}
                >
                    <div className="video-player__timeline-inner position-relative">
                        <div className="line w-100"/>
                        <div className="thumb position-absolute"/>
                    </div>
                </div>

                <div className="video-player__line flex flex-align-center flex-between">
                    <VideoPlayerLeftButtons videoRef={videoRef}/>

                    <VideoPlayerRightButtons setIsShowSettings={setIsShowSettings}/>
                </div>
            </div>
        </div>
    )
})

export default VideoPlayerControls;