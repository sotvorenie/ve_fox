import React, {useEffect, useRef, useState} from "react";
import {useShallow} from "zustand/react/shallow";

import {BASE_URL} from "../../../api/url.ts";
import {apiSaveTime} from "../../../api/save_time/saveTime.ts";

import VideoPlayButton from "./VideoPlayButton.tsx";
import ToggleButton from "../../ui/ToggleButton.tsx";

import SoundOnIcon from "../../../assets/images/icons/video-player/SoundOnIcon.tsx";
import SoundOffIcon from "../../../assets/images/icons/video-player/SoundOffIcon.tsx";
import SettingsIcon from "../../../assets/images/icons/video-player/SettingsIcon.tsx";
import ExpandIcon from "../../../assets/images/icons/video-player/ExpandIcon.tsx";
import ReduceIcon from "../../../assets/images/icons/video-player/ReduceIcon.tsx";
import TimePrevIcon from "../../../assets/images/icons/video-player/TimePrevIcon.tsx";
import TimeNextIcon from "../../../assets/images/icons/video-player/TimeNextIcon.tsx";

import {useVideoStore} from "../../../store/useVideoStore.ts";
import {usePlayerStore} from "../../../store/usePlayerStore.ts";

interface Props {
    readonly savedTime: number
}

function VideoPlayer({savedTime}: Props) {
    const {video} = useVideoStore(useShallow((state) => ({ ...state })))

    const {
        isPlaying,
        volume,
        isShowSettings,
        duration,
        currentTime,
        isSubtitlesActive,
        subtitlesText,
        setIsPlaying,
        setVolume,
        setDuration,
        setCurrentTime,
        setSubtitlesActive,
        setSubtitlesText,
        setIsShowControls,
        setIsShowSettings,
        isShowControls,
        isFullscreen,
        setIsFullscreen,
        clearData
    } = usePlayerStore(useShallow((state) => ({ ...state })))

    const videoRef = useRef<HTMLVideoElement | null>(null)
    const timelineRef = useRef<HTMLDivElement | null>(null)

    // при загрузке метаданных видео
    const loadedMetadata = () => {
        if (!videoRef.current) return

        setDuration(videoRef.current.duration)
    }

    // обновляем css-переменную для timeline
    const updateTimeline = (progress: number): void => {
        if (!videoRef.current || !timelineRef.current) return

        const rect = timelineRef.current.getBoundingClientRect()
        const percent = rect.left - progress
    }

    useEffect(() => {
        if (!videoRef.current) return
        videoRef.current.volume = volume
    }, [])

    useEffect(() => {
        clearData()
    }, [video.id])

    return (
        <section className={`video-player position-relative is-fullscreen controls-hidden`}
             aria-label="Видео плеер"
        >
            <button className="video-player__hidden position-absolute inset-0 z-1 cursor-default"/>
            <video src={`${BASE_URL}${video?.video_url}`}
                   autoPlay
                   crossOrigin="anonymous"
                   ref={videoRef}
                   onLoadedMetadata={loadedMetadata}
            >
                <track src={video?.subtitle_url}
                       key={video?.subtitle_url}
                       kind="captions"
                       srcLang="ru"
                       label="Русские субтитры"
                       default
                />
            </video>

            <div className="video-player__subtitles position-absolute">
                <span dangerouslySetInnerHTML={{__html: subtitlesText}}/>
            </div>

            {(
                <div className="video-player__settings position-absolute inset-0 z-10">
                    <div className="video-player__settings-content position-absolute">
                        <ul className="video-player__settings-list">
                            <li className="video-player__settings-item">
                                <label className="video-player__settings-label hover-color-accent flex flex-align-center">
                                    Субтитры
                                    <ToggleButton active={isSubtitlesActive} setActive={setSubtitlesActive}/>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            <div className={`video-player__controls position-absolute inset-0 hidden`}>
                <VideoPlayButton
                    className={`video-player__play-btn absolute-center cursor-default is-active`}
                    isPlaying={isPlaying}
                    setIsPlaying={(): void => {}}
                />

                <div className="video-player__bottom position-absolute flex flex-column w-100 z-10">
                    <div className="video-player__timeline cursor-pointer w-100" ref={timelineRef}>
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

                            <div className="video-player__volume video-player__background">
                                <button className="video-player__line-item recolor-svg i-svg"
                                        type="button"
                                        title="Настройки звука"
                                >
                                    {volume > 0 ? <SoundOnIcon/> : <SoundOffIcon/>}
                                </button>

                                <input type="range"
                                       min={0}
                                       max={1}
                                       step={0.1}
                                       value={volume}
                                       style={{display: 'none'}}
                                />
                            </div>

                            <button className="video-player__prev-10 video-player__line-item video-player__background recolor-svg i-svg"
                                    type="button"
                                    title="На 10 секунд назад"
                            >
                                <TimePrevIcon/>
                            </button>

                            <button className="video-player__next-10 video-player__line-item video-player__background recolor-svg i-svg"
                                    type="button"
                                    title="На 10 секунд вперед"
                            >
                                <TimeNextIcon/>
                            </button>

                            <span className="video-player__duration video-player__line-item video-player__background">
                            </span>
                        </div>

                        <div className="video-player__right flex flex-align-center">
                            <button className="video-player__line-settings video-player__line-item video-player__background recolor-svg i-svg z-1000"
                                    type="button"
                                    title="Настройки"
                                    onClick={() => setIsShowSettings(true)}
                            >
                                <SettingsIcon/>
                            </button>

                            <button className="video-player__line-item video-player__background recolor-svg i-svg"
                                    type="button"
                            >
                                {isFullscreen ? <ReduceIcon/> : <ExpandIcon/>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VideoPlayer;