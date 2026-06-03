import {VideoForList} from "../../../types/video.ts";
import VideoItem from "../../common/VideoItem.tsx";
import {JSX} from "react";

interface VideoProps {
    readonly videos: VideoForList[];
}

function ChannelMain({ videos }: VideoProps): JSX.Element {

    return (
        <div className="channel__main">
            <p className="channel__sub-title h6">Новинки</p>
            <ul className="channel__list row">
                {videos?.map((video: VideoForList) => (
                    <VideoItem video={video} isRow={false} key={video.id}/>
                ))}
            </ul>
        </div>
    )
}

export default ChannelMain;