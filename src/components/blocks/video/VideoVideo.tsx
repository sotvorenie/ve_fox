import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {Video} from "../../../types/video.ts";

import {useRouterParams} from "../../../composables/useRouterParams.ts";

import LikeIcon from "../../../assets/images/icons/LikeIcon.tsx";

import {useVideo} from "../../../hooks/useVideo.ts";
import {apiGetVideo} from "../../../api/video/video.ts";

function VideoVideo() {
    const {getParam} = useRouterParams()

    const {video, setVideo} = useVideo()

    const [isLiked, setIsLiked] = useState<boolean>(false)

    const [path, setPath] = useState<string>("")

    const handleLike = () => {
        setIsLiked(prev => !prev)
    }

    const getVideo = async (path: string) => {
        try {
            const data: Video = await apiGetVideo(path)

            if (data) {
                setVideo(data)
            }
        } catch (err) {

        }
    }

    useEffect(() => {
        setPath(getParam("video_path") ?? '')
    }, []);

    useEffect(() => {
        if (path && !video.name) {
            getVideo(path)
        }
    }, [path]);

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