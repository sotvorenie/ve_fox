import {Video} from "../../../types/video.ts";
import VideoItem from "../../common/VideoItem.tsx";

interface VideoProps {
    readonly videos: Video[];
    readonly hasMore: boolean;
}

function ChannelVideos({videos, hasMore}: VideoProps) {

    return (
        <div className="channel__videos">
            <p className="channel__sub-title h6">Все видео</p>
            <ul className="channel__list row">
                {videos?.map((video: Video) => (
                    <VideoItem video={video} isRow={false} key={video.id}/>
                ))}
            </ul>

            {hasMore && <button>Загрузить еще</button>}
        </div>
    )
}

export default ChannelVideos;