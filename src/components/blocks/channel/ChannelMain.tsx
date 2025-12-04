import {Video} from "../../../types/video.ts";
import VideoItem from "../../common/VideoItem.tsx";
import {JSX} from "react";

interface VideoProps {
    videos: Video[];
}

function ChannelMain({ videos }: VideoProps): JSX.Element {

    return (
        <div className="channel__main">
            <p className="channel__sub-title h6">Новинки</p>
            <ul className="channel__list row">
                {videos && videos.map((video: Video) => (
                    <VideoItem video={video} isRow={false} key={video.video}/>
                ))}
            </ul>
        </div>
    )
}

export default ChannelMain;