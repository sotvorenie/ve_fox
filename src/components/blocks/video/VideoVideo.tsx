import {useState} from "react";
import {Link} from "react-router-dom";

import {useVideo} from "../../../hooks/useVideo.ts";
import {useMainPages} from "../../../hooks/useMainPages.ts";
import {useChannel} from "../../../hooks/useChannel.ts";

import LikeIcon from "../../../assets/images/icons/LikeIcon.tsx";

function VideoVideo() {
    const {video} = useVideo()
    const {pageList, setPageName} = useMainPages()
    const {setChannelName, setChannelAvatar} = useChannel()

    const [isLiked, setIsLiked] = useState(false)

    const handleLike = () => {
        setIsLiked(prev => !prev)
    }

    const handleChannel = (name: string, avatar: string | undefined) => {
        setChannelName(name)

        if (avatar) {
            setChannelAvatar(avatar)
        }

        setPageName(pageList.channel)
    }

    return (
        <div className="video">
            <video className="video__video"
                   src={video.video}
                   controls autoPlay
            />

            <p className="video__title h5">{video.name}</p>

            <div className="video__actions flex flex-align-center">
                <Link to="/"
                      className="video__channel flex flex-align-center cursor-pointer hover-color-accent"
                      onClick={() => handleChannel(video.channel, video.avatar)}
                >
                    <div className="video__channel-avatar img-container"
                    >
                        {video.avatar ?
                            (<img src={video.avatar} alt={video.channel}/>) :
                            (<span>{video.channel.slice(0, 1)}</span>)
                        }
                    </div>
                    <span className="video__channel-name text-w700">{video.channel}</span>
                </Link>

                <div className="video__buttons flex">
                    <button className="video__button recolor-svg"
                            type="button"
                            onClick={handleLike}
                    >
                        <LikeIcon className={isLiked ? 'fill' : ''}/>
                    </button>
                    <button className="video__button" type="button">
                        Смотреть позже
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VideoVideo;