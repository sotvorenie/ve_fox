import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {VideoForList} from "@/types/video";

import {viewsArr} from "@data/countArrays.ts";

import {BASE_URL} from "@api/url";

import {formatVideoName} from "@composables/useFormatVideoName";
import {formatVideoDate} from "@composables/useFormatVideoDate";
import {formatCount} from "@composables/useFormatCount.ts";

import VideoMenu from "@video/VideoMenu.tsx";
import ListColumnSkeleton from "@ui/skeletons/ListColumnSkeleton";

import {formatVideoTime} from "@composables/useFormatVideoTime";

import {useVideoStore} from "@store/useVideoStore";

interface VideoProps {
    video: VideoForList
    onClick: () => void
}

function RecommendedVideo({video, onClick}: Readonly<VideoProps>) {
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

    return (
        <li className="recommended__item flex cursor-pointer"
            key={video.id}
            onClick={onClick}
        >
            <div className="recommended__preview img-container position-relative">
                <img src={`${BASE_URL}${video.preview_url}`} alt={video.name} loading="lazy"/>

                <span className="position-absolute">{formatVideoTime(video?.duration)}</span>

                <VideoMenu id={video.id} isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} isSmall/>

                {!!(video.saved_time) && (
                    <div className="video-item__timeline recommended__timeline w-100 position-absolute bottom-0">
                        <div className="h-100"
                             style={{'width': `${video.saved_time / video.duration * 100}%`}}
                        />
                    </div>
                )}
            </div>
            <div className="recommended__info">
                <div className="recommended__text flex flex-column">
                            <span className="recommended__title two-lines">
                                {formatVideoName(video.name)}
                            </span>
                    <span className="recommended__info-item">{video.channel.name}</span>

                    <div className="flex gap-10 flex-align-center">
                        <span className="recommended__info-item">{formatVideoDate(video.date)}</span>
                        <div className="video-item__dot"/>
                        <span className="recommended__info-item">{video.views} {formatCount(video.views, viewsArr)}</span>
                    </div>
                </div>
            </div>
        </li>
    )
}

function VideoRecommended() {
    const navigate = useNavigate();

    const {
        recommendedVideos: videos,
        recommendedIsLoading: isLoading,
        video: activeVideo,
        recommendedHasMore: hasMore
    } = useVideoStore()

    const clickToVideo = (video: VideoForList) => {
        navigate(`/video/${video.id}`)
    }

    return (
        <div className="recommended w-100 h-100">
            {!isLoading && (
                <ul className="recommended__list">
                    {videos?.map((video: VideoForList) => {
                        if (activeVideo.id === video.id) return
                        return <RecommendedVideo key={video.id} video={video} onClick={() => clickToVideo(video)}/>
                    })}
                </ul>
            )}

            {isLoading && <ListColumnSkeleton isRecommended={true}/>}

            {hasMore && <button>загрузить еще</button>}
        </div>
    )
}

export default VideoRecommended;