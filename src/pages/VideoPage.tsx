import {useEffect} from "react";
import {useLocation} from "react-router-dom";

import {Video} from "../types/video.ts";

import Header from "../components/common/Header.tsx";
import VideoVideo from "../components/blocks/video/VideoVideo.tsx";
import VideoRecommended from "../components/blocks/video/VideoRecommended.tsx";

import {useVideo} from "../hooks/useVideo.ts";

function VideoPage() {
    const location = useLocation();

    const {
        handleVideo,
        clearVideoHistory,
        setActiveVideoFromHistory,
    } = useVideo()

    useEffect(() => {
        const videoInfo: Video | undefined | null = location.state?.video

        clearVideoHistory()
        setActiveVideoFromHistory(0)

        if (videoInfo) {
            handleVideo(videoInfo)
        }
    }, []);

    return(
        <div className="video-page">
            <Header isVideoPage={true}/>

            <div className="video-page__content flex">
                <VideoVideo/>

                <VideoRecommended/>
            </div>
        </div>
    );
}

export default VideoPage;