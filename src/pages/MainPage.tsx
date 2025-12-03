import {useEffect, useState} from "react";

import {Video} from "../types/video.ts";
import {ResponseVideos} from "../types/responseVideos.ts";

import {apiGetAllVideos} from "../api/videos/videos.ts";

import VideoItem from "../components/common/VideoItem.tsx";

function MainPage() {
    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(false)

    const [videos, setVideos] = useState<Video[]>([])

    const getAllVideos = async () => {
        try {
            const data: ResponseVideos = await apiGetAllVideos()

            if (data) {
                setVideos(data.videos)
                setPage(page + 1)
                setHasMore(data.has_more)
            }
        } catch (err) {

        }
    }


    useEffect(() => {
        getAllVideos()
    }, [])

    return (
        <div className="main-page__home">
            <ul className="video-list list-row row">
                {videos.length ? videos.map((video: Video) => (
                    <VideoItem key={video.video} video={video} isRow={false}/>
                )) : (<div>видев нет</div>)}
            </ul>

            <button style={{display: hasMore ? 'block' : 'none'}}>Еще</button>
        </div>
    )
}

export default MainPage;