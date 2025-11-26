import {useEffect} from "react";

import {Video} from "../../../../types/video.ts";

import {useVideos} from "../../../../hooks/useVideos.ts";
import VideoItem from "../../../common/VideoItem.tsx";

function MainHomePage() {
    const {allVideos, getAllVideos} = useVideos();

    useEffect(() => {
        getAllVideos()
    }, [])

    return (
        <ul className="video-list list-row row">
            {allVideos.length ? allVideos.map((video: Video) => (
                <VideoItem key={video.video} video={video}/>
            )) : (<div>видев нет</div>)}
        </ul>
    )
}

export default MainHomePage;