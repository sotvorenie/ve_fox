import {Video} from "../../../types/video.ts";
import VideoItem from "../../common/VideoItem.tsx";

interface VideoProps {
    videos: Video[];
}

function ChannelVideos({videos}: VideoProps) {

    return (
        <>
            <p className="channel__sub-title h6">Все видео</p>
            <ul className="channel__list row">
                {videos && videos.map((video: Video) => (
                    <VideoItem video={video} isRow={false} key={video.video}/>
                ))}
            </ul>
        </>
    )
}

export default ChannelVideos;