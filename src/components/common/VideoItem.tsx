import React from "react";
import {Link, useNavigate} from "react-router-dom";

import {VideoForList} from "@/types/video";

import {BASE_URL} from "@api/url";

import {formatVideoName} from "@composables/useFormatVideoName";
import {formatVideoDate} from "@composables/useFormatVideoDate";
import {formatVideoTime} from "@composables/useFormatVideoTime";

interface Props {
    readonly video: VideoForList;
    readonly isRow: boolean;
}

function VideoItem({video, isRow = false}: Props) {
    const navigate = useNavigate();

    const handleChannel = (event: React.MouseEvent): void => {
        event.stopPropagation()
        event.preventDefault()

        navigate(`/channel/${video.channel.id}`)
    }

    return (
        <Link to={`/video/${video.id}`}
              className="video-item col-4"
        >
            <li className={isRow ? 'video-item__row-item flex flex-align-start w-100' : 'w-100'}>
                <div className="video-item__preview img-container position-relative">
                    <img src={`${BASE_URL}${video.preview_url}`} alt={video.name} loading="lazy"/>

                    <span className="position-absolute">{formatVideoTime(video.duration)}</span>
                </div>
                <div className={isRow ? 'video-item__info flex flex-column' : 'video-item__info flex'}>
                    {!isRow &&
                        <button className="video-item__avatar img-container"
                                title={video.channel.name}
                                onClick={(event) => handleChannel(event)}
                                type="button"
                        >
                            {video.channel.avatar_url ?
                                (<img src={`${BASE_URL}${video.channel.avatar_url}`} alt={video.channel.name}/>) :
                                (<span>{video.channel.name?.slice(0, 1)}</span>)
                            }
                        </button>
                    }

                    <div className="video-item__text">
                                    <span className="video-item__title two-lines">
                                        {formatVideoName(video.name)}
                                    </span>
                        {!isRow &&
                            <span className="video-item__channel">
                                {video.channel.name}
                            </span>
                        }
                        <span className="video-item__date">{formatVideoDate(video.date)}</span>
                    </div>

                    {isRow &&
                        <button className="video-item__row-channel flex flex-align-center"
                                type="button"
                                onClick={(event) => handleChannel(event)}
                        >
                            <div className="video-item__avatar img-container">
                                {video.channel.avatar_url ?
                                    (<img src={`${BASE_URL}${video.channel.avatar_url}`} alt={video.channel.name}/>) :
                                    (<span>{video.channel.name.slice(0, 1)}</span>)
                                }
                            </div>
                            <span className="video-item__channel">{video.channel.name}</span>
                        </button>
                    }
                </div>
            </li>
        </Link>
    )
}

export default VideoItem;