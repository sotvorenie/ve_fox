import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import {useRouterParams} from "../composables/useRouterParams.ts";

import Header from "../components/common/Header.tsx";
import VideoVideo from "../components/blocks/video/VideoVideo.tsx";
import VideoRecommended from "../components/blocks/video/VideoRecommended.tsx";

import {useVideo} from "../hooks/useVideo.ts";

function VideoPage() {
    const location = useLocation();

    const {getParam} = useRouterParams()

    const {getVideo} = useVideo()

    const [path, setPath] = useState<string>('');

    useEffect(() => {
        setPath(getParam("video_path") ?? '')
    }, [location]);

    useEffect(() => {
        if (path) {
            getVideo(path)
        }
    }, [path]);

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