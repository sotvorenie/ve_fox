import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

import {removeVideoFromTable, setVideoToTable} from "../../../api/local_database";

import LikeIcon from "../../../assets/images/icons/LikeIcon.tsx";

import {useVideo} from "../../../hooks/useVideo.ts";

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
    const likeVideo = async () => {
        try {
            setLikeIsActive(false)

            await setVideoToTable(video, 'liked_videos')
        } catch (err) {

        } finally {
            setLikeIsActive(true)
        }
    }
    const dislikeVideo = async () => {
        try {
            setLikeIsActive(false)

            await removeVideoFromTable(video.video_path, 'liked_videos')
        } catch (err) {

        } finally {
            setLikeIsActive(true)
        }
    }

    const [watchLaterIsActive, setWatchLaterIsActive] = useState<boolean>(true)
    const watchLater = async () => {
        try {
            setWatchLaterIsActive(false)

            await setVideoToTable(video, 'watch_later')
        } catch (err) {

        } finally {
            setWatchLaterIsActive(true)
        }
    }
    const unwatchLater = async () => {
        try {
            setWatchLaterIsActive(false)

            await removeVideoFromTable(video.video_path, 'watch_later')
        } catch (err) {

        } finally {
            setWatchLaterIsActive(true)
        }
    }

    const handleLike = () => {
        if (!likeIsActive) return

        if (!isLiked) {
            likeVideo()
        } else {
            dislikeVideo()
        }

        setIsLiked(prev => !prev)
    }

    const handleWatchLater = () => {
        if (!watchLaterIsActive) return

        if (!isWatchLater) {
            watchLater()
        } else {
            unwatchLater()
        }

        setIsWatchLater(prev => !prev)
    }

    useEffect(() => {
        const handleKey = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === "f") {
                if (!document.fullscreenElement) {
                    videoRef.current?.requestFullscreen();
                } else {
                    document.exitFullscreen();
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
        };

        window.addEventListener("keydown", handleKey);

        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <div className="video">
            <video className="video__video"
                   src={video?.video}
                   controls autoPlay
                   ref={videoRef}
            />

            <p className="video__title h5">{video?.name}</p>

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