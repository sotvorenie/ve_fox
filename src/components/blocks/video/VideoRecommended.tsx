import {useNavigate} from "react-router-dom";
import {useShallow} from "zustand/react/shallow";

import {BASE_URL} from "../../../api/url.ts";

import {VideoForList} from "../../../types/video.ts";

import {formatVideoName} from "../../../composables/useFormatVideoName.ts";
import {formatVideoDate} from "../../../composables/useFormatVideoDate.ts";

import ListColumnSkeleton from "../../ui/skeletons/ListColumnSkeleton.tsx";

import {formatVideoTime} from "../../../composables/useFormatVideoTime.ts";

import {useVideoStore} from "../../../store/useVideoStore.ts";

function VideoRecommended() {
    const navigate = useNavigate();

    const {
        recommendedVideos: videos,
        recommendedIsLoading: isLoading,
        video: activeVideo,
        recommendedHasMore: hasMore
    } = useVideoStore(useShallow((state) => ({ ...state })))

    const clickToVideo = (video: VideoForList) => {
        navigate(`/video/${video.id}`)
    }

    return (
        <div className="recommended w-100 h-100">
            {!isLoading && (
                <ul className="recommended__list">
                    {videos?.map((video: VideoForList) => {

                        if (activeVideo.id === video.id) return

                        return (
                            <li className="recommended__item flex cursor-pointer"
                                key={video.id}
                                onClick={() => clickToVideo(video)}
                            >
                                <div className="recommended__preview img-container position-relative">
                                    <img src={`${BASE_URL}${video.preview_url}`} alt={video.name} loading="lazy"/>

                                    <span className="position-absolute">{formatVideoTime(video?.duration)}</span>
                                </div>
                                <div className="recommended__info">
                                <div className="recommended__text flex flex-column">
                            <span className="recommended__title two-lines">
                                {formatVideoName(video.name)}
                            </span>
                                        <span className="recommended__channel">{video.channel.name}</span>
                                        <span className="recommended__date">{formatVideoDate(video.date)}</span>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}

            {isLoading && <ListColumnSkeleton isRecommended={true}/>}

            {hasMore && <button>загрузить еще</button>}
        </div>
    )
}

export default VideoRecommended;