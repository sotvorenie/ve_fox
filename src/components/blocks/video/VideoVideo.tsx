import {useState} from "react";
import {Link} from "react-router-dom";


import LikeIcon from "../../../assets/images/icons/LikeIcon.tsx";

import {useVideo} from "../../../hooks/useVideo.ts";

function VideoVideo() {

    const {video} = useVideo()

    const [isLiked, setIsLiked] = useState<boolean>(false)

    const [isWatchLater, setIsWatchLater] = useState<boolean>(false)

    const handleLike = () => {
        setIsLiked(prev => !prev)
    }

    const handleWatchLater = () => {
        setIsWatchLater(prev => !prev)
    }

    return (
        <div className="video">
            <video className="video__video"
                   src={video?.video}
                   controls autoPlay
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
                            onClick={handleLike}
                    >
                        <LikeIcon/>
                    </button>
                    <button className={`video__button ${isWatchLater ? 'fill' : ''}`}
                            type="button"
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