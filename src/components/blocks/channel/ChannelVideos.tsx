import {Video} from "../../../types/video.ts";
import VideoItem from "../VideoItem.tsx";

interface VideoProps {
    videos: Video[];
    hasMore: boolean;
}

function ChannelVideos({videos, hasMore}: VideoProps) {

    return (
        <div className="channel__videos">
            <p className="channel__sub-title h6">Все видео</p>
            <ul className="channel__list row">
                {videos && videos.map((video: Video) => (
                    <VideoItem video={video} isRow={false} key={video.video}/>
                ))}
            </ul>

            {hasMore && <button>Загрузить еще</button>}
        </div>
    )
}

export default ChannelVideos;