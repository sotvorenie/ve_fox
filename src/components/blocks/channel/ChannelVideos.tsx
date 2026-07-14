import {VideoForList} from "@/types/video";

import VideoItem from "@video/VideoItem";

interface VideoProps {
    readonly videos: VideoForList[];
    readonly hasMore: boolean;
}

function ChannelVideos({videos, hasMore}: VideoProps) {

    return (
        <div className="channel__videos">
            <p className="channel__sub-title h6">Все видео</p>
            <ul className="channel__list row">
                {videos?.map((video: VideoForList) => (
                    <VideoItem video={video} isRow={false} key={video.id}/>
                ))}
            </ul>

            {hasMore && <button>Загрузить еще</button>}
        </div>
    )
}

export default ChannelVideos;