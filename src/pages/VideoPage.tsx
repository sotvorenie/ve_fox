import {useEffect} from "react";
import {useLocation} from "react-router-dom";

import MainHeader from "../components/blocks/main/header/MainHeader.tsx";
import VideoVideo from "../components/blocks/video/VideoVideo.tsx";
import VideoRecommended from "../components/blocks/video/VideoRecommended.tsx";

import {useVideo} from "../hooks/useVideo.ts";

function VideoPage() {
    const location = useLocation();

    const {video, handleVideo, clearVideoHistory, setActiveVideoFromHistory} = useVideo()

    useEffect(() => {
        if (location.state?.video && !video.name) {
            clearVideoHistory()
            setActiveVideoFromHistory(0)

            handleVideo(location.state.video)
        }
    }, []);

    return(
        <div className="video-page">
            <MainHeader isVideoPage={true}/>

            <div className="video-page__content flex">
                <VideoVideo/>

                <VideoRecommended/>
            </div>
        </div>
    );
}

export default VideoPage;