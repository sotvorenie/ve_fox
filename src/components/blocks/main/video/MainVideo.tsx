import {useState} from "react";

import {useVideo} from "../../../../hooks/useVideo.ts";

import LikeIcon from "../../../../assets/images/icons/LikeIcon.tsx";

function MainVideo() {
    const {video} = useVideo()

    const [isLiked, setIsLiked] = useState(false)

    const handleLike = () => {
        setIsLiked(prev => !prev)
    }

    return (
        <div className="video">
            <video className="video__video"
                   src={video.video}
                   controls autoPlay
            />

            <p className="video__title h5">{video.name}</p>

            <div className="video__actions flex flex-align-center">
                <div className="video__channel flex flex-align-center cursor-pointer hover-color-accent">
                    <div className="video__channel-avatar img-container">
                        {video.avatar ?
                            (<img src={video.avatar} alt={video.channel}/>) :
                            (<span>{video.channel.slice(0, 1)}</span>)
                        }
                    </div>
                    <p className="video__channel-name text-w700">{video.channel}</p>
                </div>

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

export default MainVideo;