import {Video} from "../../../../types/video.ts";
import VideoItem from "../../../common/VideoItem.tsx";

import {useChannel} from "../../../../hooks/useChannel.ts";

function ChannelMain() {
    const {channelVideos} = useChannel();

    return (
        <>
            <p className="channel__sub-title h6">Новинки</p>
            <ul className="channel__list row">
                {channelVideos && channelVideos.slice(0, 3).map((video: Video) => (
                    <VideoItem video={video} isRow={false} key={video.video}/>
                ))}
            </ul>
        </>
    )
}

export default ChannelMain;