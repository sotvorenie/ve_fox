import {Video} from "../../../../types/video.ts";
import VideoItem from "../../../common/VideoItem.tsx";

import {useChannel} from "../../../../hooks/useChannel.ts";

function ChannelVideos() {
    const {channelVideos} = useChannel();

    return (
        <>
            <p className="channel__sub-title h6">Все видео</p>
            <ul className="channel__list row">
                {channelVideos && channelVideos.map((video: Video) => (
                    <VideoItem video={video} isRow={false} key={video.video}/>
                ))}
            </ul>
        </>
    )
}

export default ChannelVideos;