import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

import {Video} from "../../../../types/video.ts";

import {useVideos} from "../../../../hooks/useVideos.ts";

import VideoItem from "../../../common/VideoItem.tsx";

function MainHomePage() {
    const {allVideos, getAllVideos} = useVideos();

    const [_, setSearchParams] = useSearchParams()


    useEffect(() => {
        setSearchParams({})

        getAllVideos()
    }, [])

    return (
        <div className="main-page__home">
            <ul className="video-list list-row row">
                {allVideos.length ? allVideos.map((video: Video) => (
                    <VideoItem key={video.video} video={video} isRow={false}/>
                )) : (<div>видев нет</div>)}
            </ul>
        </div>
    )
}

export default MainHomePage;