import {Dispatch, SetStateAction, useState} from "react";
import {Link} from "react-router-dom";
import { useShallow } from 'zustand/react/shallow';

import {BASE_URL} from "../../../api/url.ts";
import {apiLike} from "../../../api/like/like.ts";

import VideoPlayer from "./VideoPlayer.tsx";

import LikeIcon from "../../../assets/images/icons/LikeIcon.tsx";

import {useVideoStore} from "../../../store/useVideoStore.ts";

interface Props {
    readonly isLiked: boolean,
    readonly setIsLiked: Dispatch<SetStateAction<boolean>>;
    readonly isWatchLater: boolean;
    readonly setIsWatchLater: Dispatch<SetStateAction<boolean>>;
    readonly savedTime: number;
}

function VideoMain({isLiked, setIsLiked, isWatchLater, setIsWatchLater, savedTime}: Props) {
    const {video} = useVideoStore(useShallow((state) => ({ ...state })))

    const [likeIsActive, setLikeIsActive] = useState<boolean>(true)
    const [watchLaterIsActive, setWatchLaterIsActive] = useState<boolean>(true)

    const handleLike = async () => {
        if (!likeIsActive) return

        setLikeIsActive(false)
        await apiLike(video.id)
        setLikeIsActive(true)

        setIsLiked(prev => !prev)
    }
    const handleWatchLater = async () => {
        if (!watchLaterIsActive) return

        setWatchLaterIsActive(false)
        // await removeVideoFromTable(video.video_path, 'watch_later')
        setWatchLaterIsActive(true)

        setIsWatchLater(prev => !prev)
    }

    return (
        <div className="video">
            <VideoPlayer savedTime={savedTime}/>

            <p className="video__title h5 one-line">{video?.name}</p>

            <div className="video__actions flex flex-align-center">
                <Link to={`/channel/${video.channel.id}`}
                      state={{
                          channel: {
                              name: video.channel.name,
                              avatar: video.channel.avatar_url,
                          }
                      }}
                      className="video__channel flex flex-align-center cursor-pointer hover-color-accent"
                >
                    <div className="video__channel-avatar img-container"
                    >
                        {video.channel.avatar_url ?
                            (<img src={`${BASE_URL}${video.channel.avatar_url}`} alt={video.channel.name}/>) :
                            (<span>{video?.channel.name?.slice(0, 1)}</span>)
                        }
                    </div>
                    <span className="video__channel-name text-w700">{video.channel.name}</span>
                </Link>

                {video?.video_url ? (
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
                ) : null}
            </div>
        </div>
    )
}

export default VideoMain;