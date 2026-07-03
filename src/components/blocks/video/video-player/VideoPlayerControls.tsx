import React from "react";

import {formatVideoTime} from "@composables/useFormatVideoTime.ts";

import VideoPlayButton from "@video/VideoPlayButton.tsx";

import SoundOnIcon from "@icons/video-player/SoundOnIcon.tsx";
import SoundOffIcon from "@icons/video-player/SoundOffIcon.tsx";
import TimePrevIcon from "@icons/video-player/TimePrevIcon.tsx";
import TimeNextIcon from "@icons/video-player/TimeNextIcon.tsx";
import SettingsIcon from "@icons/video-player/SettingsIcon.tsx";
import ReduceIcon from "@icons/video-player/ReduceIcon.tsx";
import ExpandIcon from "@icons/video-player/ExpandIcon.tsx";

import {usePlayerStore} from "@store/usePlayerStore.ts";

function VideoPlayerControls() {
    const {isPlaying} = usePlayerStore()

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
                    <div className="video-player__left flex flex-align-center">
                        <VideoPlayButton className="video-player__line-play video-player__line-item"
                                         isPlaying={isPlaying}
                                         setIsPlaying={setIsPlaying}
                        />

                        <div className="video-player__volume video-player__background flex">
                            <button className="video-player__line-item recolor-svg i-svg"
                                    type="button"
                                    title="Настройки звука"
                                    onClick={handleVolume}
                            >
                                {volume > 0 ? <SoundOnIcon/> : <SoundOffIcon/>}
                            </button>

                            <input type="range"
                                   min={0}
                                   max={1}
                                   step={0.1}
                                   value={volume}
                                   onChange={changeVolume}
                                   style={{'--fill-percent': `${volume * 100}%`} as React.CSSProperties}
                            />
                        </div>

                        <button
                            className="video-player__prev-10 video-player__line-item video-player__background recolor-svg i-svg"
                            type="button"
                            title="На 10 секунд назад"
                            onClick={setMinus10Sec}
                        >
                            <TimePrevIcon/>
                        </button>

                        <button
                            className="video-player__next-10 video-player__line-item video-player__background recolor-svg i-svg"
                            type="button"
                            title="На 10 секунд вперед"
                            onClick={setPlus10Sec}
                        >
                            <TimeNextIcon/>
                        </button>

                        <span
                            className="video-player__duration video-player__line-item video-player__background">
                                {formatVideoTime(currentTime)} / {formatVideoTime(duration)}
                            </span>
                    </div>

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
}

export default VideoPlayerControls;