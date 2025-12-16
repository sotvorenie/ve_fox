import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

import {removeVideoFromTable, setVideoToTable} from "../../../api/local_database";

import LikeIcon from "../../../assets/images/icons/LikeIcon.tsx";

import {useVideo} from "../../../hooks/useVideo.ts";
import {
    getTimeFromWatchTime,
    removeTimeFromWatchTime,
    setTimeToWatchTime
} from "../../../api/local_database/videoWatchTimes.ts";

interface Props {
    isLiked: boolean,
    setIsLiked: Dispatch<SetStateAction<boolean>>;
    isWatchLater: boolean;
    setIsWatchLater: Dispatch<SetStateAction<boolean>>;
}

function VideoVideo({isLiked, setIsLiked, isWatchLater, setIsWatchLater}: Props) {
    const {video} = useVideo()

    const videoRef = useRef<HTMLVideoElement | null>(null);

    const [likeIsActive, setLikeIsActive] = useState<boolean>(true)
    const [watchLaterIsActive, setWatchLaterIsActive] = useState<boolean>(true)

    const handleLike = async () => {
        if (!likeIsActive) return

        if (!isLiked) {
            setLikeIsActive(false)
            await setVideoToTable(video, 'liked_videos')
            setLikeIsActive(true)
        } else {
            setLikeIsActive(false)
            await removeVideoFromTable(video.video_path, 'liked_videos')
            setLikeIsActive(true)
        }

        setIsLiked(prev => !prev)
    }
    const handleWatchLater = async () => {
        if (!watchLaterIsActive) return

        if (!isWatchLater) {
            setWatchLaterIsActive(false)
            await setVideoToTable(video, 'watch_later')
            setWatchLaterIsActive(true)
        } else {
            setWatchLaterIsActive(false)
            await removeVideoFromTable(video.video_path, 'watch_later')
            setWatchLaterIsActive(true)
        }

        setIsWatchLater(prev => !prev)
    }

    const isVideoAlmostFinished = (currentTime: number, duration: number) => {
        if (!duration || duration === Infinity) return false;

        const remaining = duration - currentTime;

        // видео <= 5 минут
        if (duration <= 300) {
            return remaining <= duration * 0.1;
        }

        // видео > 5 минут
        return remaining <= 60;
    };

    const saveTime = async () => {
        if (!videoRef.current || !video.video_path) return

        const { currentTime, duration } = videoRef.current

        if (isVideoAlmostFinished(currentTime, duration)) {
            try {
                await removeTimeFromWatchTime(video.video_path)
            } catch (err) {
                await setTimeToWatchTime(video.video_path, 0)
            }

            return
        }


        await setTimeToWatchTime(video.video_path, videoRef.current.currentTime)
    }

    useEffect(() => {
        const handleKey = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === "f") {
                if (!document.fullscreenElement) {
                    videoRef.current?.requestFullscreen()
                } else {
                    document.exitFullscreen()
                }
            }

            if (event.code === 'Space') {
                event.preventDefault()

                if (videoRef.current?.paused) {
                    videoRef.current.play()
                } else {
                    videoRef.current?.pause()
                }
            }
        }

        window.addEventListener("keydown", handleKey)

        return () => window.removeEventListener("keydown", handleKey)
    }, [])

    useEffect(() => {
        if (!videoRef.current || !video.video_path || !video.video) return;

        const videoEl = videoRef.current;

        const restoreTime = async () => {
            try {
                const savedTime = await getTimeFromWatchTime(video.video_path)
                videoEl.currentTime = savedTime || 0;
            } catch {
                videoEl.currentTime = 0
            }
        }

        videoEl.addEventListener("loadedmetadata", restoreTime)
        videoEl.addEventListener("seeked", saveTime)
        videoEl.addEventListener("pause", saveTime)

        const interval = setInterval(saveTime, 5000)

        return () => {
            videoEl.removeEventListener("loadedmetadata", restoreTime)
            videoEl.removeEventListener("seeked", saveTime)
            videoEl.removeEventListener("pause", saveTime)
            clearInterval(interval)
        }
    }, [video.video_path])

    return (
        <div className="video">
            <video className="video__video"
                   src={video?.video}
                   controls autoPlay
                   ref={videoRef}
            />

            <p className="video__title h5 one-line">{video?.name}</p>

            <div className="video__actions flex flex-align-center">
                <Link to={`/channel?channel=${video.channel}`}
                      state={{
                          channel: {
                              name: video.channel,
                              avatar: video.avatar,
                          }
                      }}
                      className="video__channel flex flex-align-center cursor-pointer hover-color-accent"
                >
                    <div className="video__channel-avatar img-container"
                    >
                        {video?.avatar ?
                            (<img src={video.avatar} alt={video.channel}/>) :
                            (<span>{video?.channel?.slice(0, 1)}</span>)
                        }
                    </div>
                    <span className="video__channel-name text-w700">{video?.channel}</span>
                </Link>

                <div className="video__buttons flex">
                    <button className={`video__button recolor-svg ${isLiked ? 'fill' : ''}`}
                            type="button"
                            disabled={!likeIsActive}
                            onClick={handleLike}
                    >
                        <LikeIcon/>
                    </button>
                    <button className={`video__button ${isWatchLater ? 'fill' : ''}`}
                            type="button"
                            disabled={!watchLaterIsActive}
                            onClick={handleWatchLater}
                    >
                        {isWatchLater ? 'Удалить из "Смотреть позже"' : 'Смотреть позже'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VideoVideo;