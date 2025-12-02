import {useEffect} from "react";
import {useLocation} from "react-router-dom";

import MainHeader from "../components/blocks/main/MainHeader.tsx";
import VideoVideo from "../components/blocks/video/VideoVideo.tsx";
import VideoRecommended from "../components/blocks/video/VideoRecommended.tsx";

import {useVideo} from "../hooks/useVideo.ts";

function VideoPage() {
    const location = useLocation();

    const {setVideo} = useVideo()

    useEffect(() => {
        if (location.state?.video) {
            setVideo(location.state.video)
        }
    }, []);

    return(
        <div className="video-page">
            <MainHeader backVisible={true}/>

            <div className="video-page__content flex">
                <VideoVideo/>

                <VideoRecommended/>
            </div>
        </div>
    );
}

export default VideoPage;