import React from "react";
import {Link} from "react-router-dom";
import {useSearchParams} from "react-router-dom";

import {Video} from "../../types/video.ts";

import {replaceLines, sliceString} from "../../composables/useRedactVideoName.ts";
import {redactDate} from "../../composables/useRedactDate.ts";

import {useVideo} from "../../hooks/useVideo.ts";
import {useChannel} from "../../hooks/useChannel.ts";
import {useMainPages} from "../../hooks/useMainPages.ts";

interface Props {
    video: Video;
    isRow: boolean
}

function VideoItem({video, isRow = false}: Props) {
    const {setVideo} = useVideo()
    const {setChannelName, setChannelAvatar} = useChannel()
    const {pageList, setPageName} = useMainPages()

    const [_, setSearchParams] = useSearchParams()

    const handleChannel = (event: React.MouseEvent<HTMLElement>, name: string, avatar: string | undefined) => {
        event.stopPropagation()
        event.preventDefault()

        setChannelName(name)

        setChannelAvatar(avatar ?? null)

        setSearchParams({
            page: 'channel',
            channelName: name,
            channelAvatar: avatar ?? ''
        })

        setPageName(pageList.channel)
    }

    return (
        <Link to="/video"
              state={{video: video}}
              className="video-list__item col-4"
              onClick={() => setVideo(video)}
        >
            <li className={isRow ? 'video-list__row-item flex flex-align-start' : ''}>
                <div className="video-list__preview img-container">
                    <img src={video.preview} alt={video.name} loading="lazy"/>
                </div>
                <div className={isRow ? 'video-list__info flex flex-column' : 'video-list__info flex'}>
                    {!isRow &&
                        <div className="video-list__avatar img-container"
                             onClick={(event: React.MouseEvent<HTMLDivElement>) => handleChannel(event, video.channel, video.avatar)}
                        >
                            {video.avatar ?
                                (<img src={video.avatar} alt={video.channel}/>) :
                                (<span>{video.channel.slice(0, 1)}</span>)
                            }
                        </div>
                    }

                    <div className="video-list__text">
                                    <span className="video-list__title">
                                        {replaceLines(sliceString(video.name, 90))}
                                    </span>
                        {!isRow &&
                            <span className="video-list__channel"
                                  onClick={(event: React.MouseEvent<HTMLDivElement>) => handleChannel(event, video.channel, video.avatar)}
                            >
                                {video.channel}
                            </span>
                        }
                        <span className="video-list__date">{redactDate(video.date)}</span>
                    </div>

                    {isRow &&
                        <div className="video-list__row-channel flex flex-align-center"
                             onClick={(event: React.MouseEvent<HTMLDivElement>) => handleChannel(event, video.channel, video.avatar)}
                        >
                            <div className="video-list__avatar img-container">
                                {video.avatar ?
                                    (<img src={video.avatar} alt={video.channel}/>) :
                                    (<span>{video.channel.slice(0, 1)}</span>)
                                }
                            </div>
                            <span className="video-list__channel">{video.channel}</span>
                        </div>
                    }
                </div>
            </li>
        </Link>
    )
}

export default VideoItem;