import {VideoForList} from "@/types/video";

import ListColumnSkeleton from "@ui/skeletons/ListColumnSkeleton";

import {useVideoStore} from "@store/useVideoStore";
import VideoItem from "@video/VideoItem.tsx";

function VideoRecommended() {

    const {
        recommendedVideos: videos,
        recommendedIsLoading: isLoading,
        video: activeVideo,
        recommendedHasMore: hasMore
    } = useVideoStore()

    return (
        <div className="recommended w-100 h-100">
            {!isLoading && (
                <ul className="recommended__list">
                    {videos?.map((video: VideoForList) => {
                        if (activeVideo.id === video.id) return
                        return <VideoItem key={video.id}
                                          video={video}
                                          isRow={true}
                                          showAvatar={false}
                                          isSmall isRecommendation
                        />
                    })}
                </ul>
            )}

            {isLoading && <ListColumnSkeleton isRecommended={true}/>}

            {hasMore && <button>загрузить еще</button>}
        </div>
    )
}

export default VideoRecommended;