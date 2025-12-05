import {useNavigate} from "react-router-dom";

import {Video} from "../../../types/video.ts";

import {replaceSymbols, sliceString} from "../../../composables/useRedactVideoName.ts";
import {redactDate} from "../../../composables/useRedactDate.ts";

import ListColumnSkeleton from "../../ui/skeletons/ListColumnSkeleton.tsx";

import {useVideo} from "../../../hooks/useVideo.ts";

function VideoRecommended() {
    const navigate = useNavigate();

    const {
        video: activeVideo,
        recommendedVideos: videos,
        recommendedIsLoading: isLoading,
        recommendedHasMore: hasMore
    } = useVideo()

    const clickToVideo = (video: Video) => {
        navigate(`/video?video_path=${video.video_path}`)
    }

    return (
        <div className="recommended">
            {!isLoading && (
                <ul className="recommended__list">
                    {videos?.map((video: Video) => {

                        if (activeVideo.video === video.video) return

                        return (
                            <li className="recommended__item flex cursor-pointer"
                                key={video.video}
                                onClick={() => clickToVideo(video)}
                            >
                                <div className="recommended__preview img-container">
                                    <img src={video.preview} alt={video.name} loading="lazy"/>
                                </div>
                                <div className="recommended__info">
                                    <div className="recommended__text flex flex-column">
                            <span className="recommended__title">
                                {replaceSymbols(sliceString(video.name, 34))}
                            </span>
                                        <span className="recommended__channel">{video.channel}</span>
                                        <span className="recommended__date">{redactDate(video.date)}</span>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}

            {isLoading && <ListColumnSkeleton/>}

            {hasMore && <button>загрузить еще</button>}
        </div>
    )
}

export default VideoRecommended;