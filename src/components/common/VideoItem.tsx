import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

import {Video} from "../../types/video.ts";

import {replaceSymbols, sliceString} from "../../composables/useRedactVideoName.ts";
import {redactDate} from "../../composables/useRedactDate.ts";

import React from "react";

interface Props {
    video: Video;
    isRow: boolean;
}

function VideoItem({video, isRow = false}: Props) {
    const navigate = useNavigate();

    const handleChannel = (event: React.MouseEvent): void => {
        event.stopPropagation()
        event.preventDefault()

        navigate(`/channel?channel=${video.channel}`, {
            state: {
                channel: {
                    name: video.channel,
                    avatar: video.avatar,
                }
            }
        })
    }

    return (
        <Link to={`/video?video_path=${video.video_path}`}
              className="video-list__item col-4"
        >
            <li className={isRow ? 'video-list__row-item flex flex-align-start' : ''}>
                <div className="video-list__preview img-container">
                    <img src={video.preview} alt={video.name} loading="lazy"/>
                </div>
                <div className={isRow ? 'video-list__info flex flex-column' : 'video-list__info flex'}>
                    {!isRow &&
                        <div className="video-list__avatar img-container"
                                title={video.channel}
                                onClick={(event) => handleChannel(event)}
                        >
                            {video.avatar ?
                                (<img src={video.avatar} alt={video.channel}/>) :
                                (<span>{video.channel.slice(0, 1)}</span>)
                            }
                        </div>
                    }

                    <div className="video-list__text">
                                    <span className="video-list__title">
                                        {replaceSymbols(sliceString(video.name, 90))}
                                    </span>
                        {!isRow &&
                            <span className="video-list__channel">
                                {video.channel}
                            </span>
                        }
                        <span className="video-list__date">{redactDate(video.date)}</span>
                    </div>

                    {isRow &&
                        <button className="video-list__row-channel flex flex-align-center"
                                type="button"
                                onClick={(event) => handleChannel(event)}
                        >
                            <div className="video-list__avatar img-container">
                                {video.avatar ?
                                    (<img src={video.avatar} alt={video.channel}/>) :
                                    (<span>{video.channel.slice(0, 1)}</span>)
                                }
                            </div>
                            <span className="video-list__channel">{video.channel}</span>
                        </button>
                    }
                </div>
            </li>
        </Link>
    )
}

export default VideoItem;