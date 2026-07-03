import React, {useEffect, useRef, useState} from "react";

import {BASE_URL} from "@api/url";

import {apiSaveTime} from "@api/save_time/saveTime";

import {formatVideoTime} from "@composables/useFormatVideoTime";

import VideoPlayButton from "@video/VideoPlayButton";

import SoundOnIcon from "@icons/video-player/SoundOnIcon";
import SoundOffIcon from "@icons/video-player/SoundOffIcon";
import SettingsIcon from "@icons/video-player/SettingsIcon";
import ExpandIcon from "@icons/video-player/ExpandIcon";
import ReduceIcon from "@icons/video-player/ReduceIcon";
import TimePrevIcon from "@icons/video-player/TimePrevIcon";
import TimeNextIcon from "@icons/video-player/TimeNextIcon";

import {useVideoStore} from "@store/useVideoStore";
import {usePlayerStore} from "@store/usePlayerStore";
import {useUserStore} from "@store/useUserStore";
import VideoPlayerSettings from "@video/video-player/VideoPlayerSettings.tsx";

interface Props {
    savedTime: number
}

function VideoPlayer({savedTime}: Readonly<Props>) {
    const {video} = useVideoStore()

    const {
        isPlaying,
        volume,
        oldVolume,
        isShowSettings,
        isShowControls,
        isFullscreen,
        duration,
        currentTime
    } = usePlayerStore();
    const {
        setIsPlaying,
        toggleIsPlaying,
        setVolume,
        setOldVolume,
        setDuration,
        setCurrentTime,
        setIsShowControls,
        setIsShowSettings,
        setIsFullscreen,
        toggleIsFullscreen,
        clearData
    } = usePlayerStore();
    const {isLogged} = useUserStore();

    const [progress, setProgress] = useState<number>(0);
    const [isMoving, setIsMoving] = useState<boolean>(false)

    const sectionRef = useRef<HTMLElement | null>(null)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const timelineRef = useRef<HTMLDivElement | null>(null)

    const hideControlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const cursorTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const saveTimeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    const isPlayingRef = useRef(isPlaying)

    const settingsBtnRef = useRef<HTMLButtonElement | null>(null)

    // при загрузке метаданных видео
    const loadedMetadata = () => {
        if (!videoRef.current) return

        setDuration(videoRef.current.duration)
    }

    // обновляем progress для timeline
    const updateTimeline = (e: React.SyntheticEvent<HTMLVideoElement, Event>): void => {
        if (!videoRef.current || !timelineRef.current) return
        if (isMoving) return

        setCurrentTime(e.currentTarget.currentTime)
        setProgress((e.currentTarget.currentTime / videoRef.current.duration) * 100)
    }

    // перемещение timeline
    const updateVideoTime = (e: MouseEvent | React.MouseEvent) => {
        if (!timelineRef.current || !videoRef.current) return

        const rect = timelineRef.current.getBoundingClientRect()
        let percent: number = (e.clientX - rect.left) / rect.width
        percent = Math.min(Math.max(percent, 0), 1)
        setProgress(percent * 100)
        videoRef.current.currentTime = percent * duration
    }
    const mouseDown = (e: MouseEvent | React.MouseEvent) => {
        if (!videoRef.current || !timelineRef.current) return

        setIsMoving(true)
        updateVideoTime(e)
    }

    // +- 10 секунд
    const setPlus10Sec = () => {
        if (!videoRef.current) return

        videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration)
    }
    const setMinus10Sec = () => {
        if (!videoRef.current) return

        videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0)
    }

    // показ/скрытие контроллеров
    const hideControllers = () => {
        if (!isPlaying || isShowSettings) return

        setIsShowControls(false)
    }
    const showControllers = () => {
        if (!isPlaying) return

        setIsShowControls(true)
    }

    // изменение уровня громкости
    const handleVolume = () => {
        if (volume > 0) {
            localStorage.setItem('volume', '0')
            setOldVolume(volume)
            setVolume(0)
        } else {
            localStorage.setItem('volume', JSON.stringify(oldVolume))
            setVolume(oldVolume)
        }
    }
    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        localStorage.setItem('volume', JSON.stringify(e.target.value))
        setVolume(Number.parseFloat(e.target.value))
    }

    useEffect(() => {
        if (!videoRef.current) return
        videoRef.current.volume = volume

        const handleKeys = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                toggleIsPlaying()
            } else if (e.key === 'f' && !(document.activeElement instanceof HTMLInputElement)) {
                toggleIsFullscreen()
            } else if (e.code === 'Escape') {
                setIsFullscreen(false)
            }
        }

        document.addEventListener('keydown', handleKeys)

        return () => {
            document.removeEventListener('keydown', handleKeys)
        }
    }, [])

    useEffect(() => {
        clearData()

        if (videoRef.current) {
            const timerTime: number = video.duration >= 600 ? 60000 : 30000

            if (saveTimeTimer.current) clearTimeout(saveTimeTimer.current)

            saveTimeTimer.current = setInterval(() => {
                if (isPlayingRef.current && isLogged) {
                    apiSaveTime(video.id, videoRef.current!.currentTime).then()
                }
            }, timerTime)

            return () => {
                if (saveTimeTimer.current) clearTimeout(saveTimeTimer.current)
            }
        }
    }, [video.id])

    useEffect(() => {
        if (!videoRef.current) return

        isPlaying ? videoRef.current.play() : videoRef.current.pause()

        setIsShowControls(true)

        const moveCursor = () => {
            setIsShowControls(true)

            if (cursorTimer.current) clearTimeout(cursorTimer.current)
            cursorTimer.current = setTimeout(() => {
                setIsShowControls(false)
            }, 2000)
        }

        if (isPlaying && !isShowSettings) {
            hideControlsTimer.current = setTimeout(() => {
                setIsShowControls(false)
            }, 2000)

            sectionRef.current?.addEventListener('mousemove', moveCursor)
        } else {
            setIsShowControls(true)
        }

        return () => {
            if (hideControlsTimer.current && cursorTimer.current) {
                clearTimeout(hideControlsTimer.current)
                clearTimeout(cursorTimer.current)
            }
            sectionRef.current?.removeEventListener('mousemove', moveCursor)
        }
    }, [isPlaying, isShowSettings, isFullscreen])

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            if (!videoRef.current || !timelineRef.current) return
            if (!isMoving) return

            updateVideoTime(e)
        }
        const mouseUp = () => {
            if (!videoRef.current || !timelineRef.current) return

            setIsMoving(false)
            setCurrentTime(videoRef.current.currentTime)
        }

        if (isMoving) {
            globalThis.addEventListener('mousemove', mouseMove)
            globalThis.addEventListener('mouseup', mouseUp)
        }

        return () => {
            globalThis.removeEventListener('mousemove', mouseMove)
            globalThis.removeEventListener('mouseup', mouseUp)
        }
    }, [isMoving])

    useEffect(() => {
        const closeSettings = () => {
            setIsShowSettings(false)
        }

        if (isShowSettings) {
            const timer = setTimeout(() => {
                globalThis.addEventListener('click', closeSettings)
            }, 0)

            return () => {
                clearTimeout(timer)
                globalThis.removeEventListener('click', closeSettings)
            }
        } else if (settingsBtnRef.current) {
            settingsBtnRef.current.blur()
        }
    }, [isShowSettings])

    useEffect(() => {
        if (!videoRef.current) return

        videoRef.current.volume = volume
    }, [volume])

    useEffect(() => {
        isPlayingRef.current = isPlaying
    }, [isPlaying])

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = savedTime
        }
    }, [savedTime])

    return (
        <section className={
                    `video-player position-relative 
                    ${isFullscreen ? 'is-fullscreen' : ''}
                    ${isShowControls ? '' : 'controls-hidden'}`
                 }
                 ref={sectionRef}
                 aria-label="Видео-плеер"
                 onMouseLeave={hideControllers}
                 onMouseEnter={showControllers}
        >
            <button className="video-player__hidden position-absolute inset-0 z-100 cursor-pointer"
                    onClick={toggleIsPlaying}
            />
            <video src={`${BASE_URL}${video?.video_url}`}
                   autoPlay
                   crossOrigin="anonymous"
                   ref={videoRef}
                   onLoadedMetadata={loadedMetadata}
                   onTimeUpdate={updateTimeline}
                   onEnded={() => setIsPlaying(false)}
            >
                <track src=""
                       kind="captions"
                       srcLang="ru"
                       label="Русские субтитры"
                       default
                />
            </video>

            <VideoPlayerSettings isShowSettings={isShowSettings}/>

            <div className={`video-player__controls position-absolute inset-0 hidden`}>
                <VideoPlayButton
                    className={`video-player__play-btn absolute-center cursor-default is-active`}
                    isPlaying={isPlaying}
                    setIsPlaying={(): void => {}}
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
                                       style={{ '--fill-percent': `${volume * 100}%` } as React.CSSProperties}
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
        </section>
    )
}

export default VideoPlayer;