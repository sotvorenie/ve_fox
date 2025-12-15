import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import {setVideoToTable} from "../api/local_database";
import {check} from "../api/local_database/checkInfo.ts";

import {useRouterParams} from "../composables/useRouterParams.ts";

import Header from "../components/common/Header.tsx";
import VideoVideo from "../components/blocks/video/VideoVideo.tsx";
import VideoRecommended from "../components/blocks/video/VideoRecommended.tsx";

import {useVideo} from "../hooks/useVideo.ts";

function VideoPage() {
    const location = useLocation();

    const {getParam} = useRouterParams()

    const {video, getVideo} = useVideo()

    const [path, setPath] = useState<string>('');

    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [isWatchLater, setIsWatchLater] = useState<boolean>(false)

    const updateDB = async () => {
        const checkLike: boolean = await check(video.video_path, 'liked_videos')
        setIsLiked(checkLike)
        const checkWatchLater: boolean = await check(video.video_path, 'watch_later')
        setIsWatchLater(checkWatchLater)
        await setVideoToTable(video, 'history')
    }

    useEffect(() => {
        setPath(getParam("video_path") ?? '')
    }, [location]);

    useEffect(() => {
        if (path) {
            getVideo(path)
        }
    }, [path]);

    useEffect(() => {
        if (video.video) {
            updateDB()
        }
    }, [video]);

    return(
        <div className="video-page">
            <Header isVideoPage={true}/>

            <div className="video-page__content flex">
                <VideoVideo isLiked={isLiked} setIsLiked={setIsLiked} isWatchLater={isWatchLater} setIsWatchLater={setIsWatchLater}/>

                <VideoRecommended/>
            </div>
        </div>
    );
}

export default VideoPage;