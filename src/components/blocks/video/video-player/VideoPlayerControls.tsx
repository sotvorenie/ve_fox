import React, {useRef, forwardRef, useImperativeHandle} from "react";

import VideoPlayButton from "@video/VideoPlayButton.tsx";

import VideoPlayerButtons from "@video/video-player/VideoPlayerButtons.tsx";

import {usePlayerStore} from "@store/usePlayerStore.ts";
import SettingsIcon from "@icons/video-player/SettingsIcon.tsx";
import ReduceIcon from "@icons/video-player/ReduceIcon.tsx";
import ExpandIcon from "@icons/video-player/ExpandIcon.tsx";

interface Props {
    setIsShowSettings: (value: any) => void
    setIsMoving: (value: any) => void
    progress: number
    updateVideoTime: (value: any) => void
    videoRef: React.RefObject<HTMLVideoElement | null>
}
export interface ControlsHandles {
    timeline: HTMLDivElement | null
    settingsBtn: HTMLButtonElement | null
}

const VideoPlayerControls = forwardRef<ControlsHandles, Props>((props, ref) => {
    const { videoRef, progress, setIsMoving, updateVideoTime, setIsShowSettings } = props
    
    const timelineRef = useRef<HTMLDivElement>(null)
    const settingsBtnRef = useRef<HTMLButtonElement | null>(null)
    useImperativeHandle(ref, () => ({
        timeline: timelineRef.current,
        settingsBtn: settingsBtnRef.current,
    }), [])

    const {
        isPlaying,
        isFullscreen
    } = usePlayerStore()
    const {toggleIsFullscreen} = usePlayerStore()

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
                    <VideoPlayerButtons videoRef={videoRef}/>

                    <div className="video-player__right flex flex-align-center">
                        <button
                            className="video-player__line-settings video-player__line-item video-player__background recolor-svg i-svg z-1000"
                            type="button"
                            title="Настройки"
                            onClick={() => setIsShowSettings(true)}
                            ref={settingsBtnRef}
                        >
                            <SettingsIcon/>
                        </button>

                        <button className="video-player__line-item video-player__background recolor-svg i-svg"
                                type="button"
                                onClick={() => toggleIsFullscreen()}
                        >
                            {isFullscreen ? <ReduceIcon/> : <ExpandIcon/>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default VideoPlayerControls;