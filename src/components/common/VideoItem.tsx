import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import {VideoForList} from "@/types/video";

import {BASE_URL} from "@api/url";

import {formatVideoName} from "@composables/useFormatVideoName";
import {formatVideoDate} from "@composables/useFormatVideoDate";
import {formatVideoTime} from "@composables/useFormatVideoTime";

import VideoMenu from "@video/VideoMenu.tsx";

interface Props {
    video: VideoForList
    isRow: boolean
    showAvatar?: boolean
    isSmall?: boolean
    className?: string
}

function VideoItem({video, isRow = false, showAvatar = true, isSmall = false, className}: Readonly<Props>) {
    const navigate = useNavigate();

    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)

    const handleChannel = (event: React.MouseEvent): void => {
        event.stopPropagation()
        event.preventDefault()

        navigate(`/channel/${video.channel.id}`)
    }

    return (
        <li className={`video-item w-100 ${isSmall ? 'is-small' : ''} ${className}`}>
            <Link to={`/video/${video.id}`}
                  className={isRow ? 'video-item__row-item flex flex-align-start w-100' : 'w-100 flex flex-column'}
            >
                <div className="video-item__preview img-container position-relative">
                    <img src={`${BASE_URL}${video.preview_url}`} alt={video.name} loading="lazy"/>

                    <span className="position-absolute">{formatVideoTime(video.duration)}</span>

                    <VideoMenu id={video.id} isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu}/>

                    {!!(video.saved_time) && (
                        <div className="video-item__timeline w-100 position-absolute">
                            <div className="h-100"
                                 style={{'width': `${video.saved_time / video.duration * 100}%`}}
                            />
                        </div>
                    )}
                </div>
                <div className={isRow ? 'video-item__info flex flex-column' : 'video-item__info flex'}>
                    {!isRow && showAvatar &&
                        <button className="video-item__avatar img-container radius-50 text-upper"
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

                    <div className="video-item__text flex flex-column">
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
                            {showAvatar && (
                                <div className="video-item__avatar img-container radius-50 text-upper">
                                    {video.channel.avatar_url ?
                                        (<img src={`${BASE_URL}${video.channel.avatar_url}`}
                                              alt={video.channel.name}/>) :
                                        (<span>{video.channel.name.slice(0, 1)}</span>)
                                    }
                                </div>
                            )}
                            <span className="video-item__channel">{video.channel.name}</span>
                        </button>
                    }
                </div>
            </Link>
        </li>
    )
}

export default VideoItem;