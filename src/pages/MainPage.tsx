import {useEffect, useState} from "react";

import {Video} from "../types/video.ts";
import {ResponseVideos} from "../types/responseVideos.ts";

import {apiGetAllVideos} from "../api/videos/videos.ts";

import VideoItem from "../components/blocks/VideoItem.tsx";
import ListRowSkeleton from "../components/ui/skeletons/ListRowSkeleton.tsx";
import MainEmpty from "../components/ui/empty/mainEmpty.tsx";

import {usePages} from "../hooks/usePages.ts";

function MainPage() {
    const {setRouterPage} = usePages()

    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(false)

    const [videos, setVideos] = useState<Video[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const getAllVideos = async () => {
        try {
            setIsLoading(true)

            const data: ResponseVideos = await apiGetAllVideos()

            if (data) {
                setVideos(data.videos)
                setPage(page + 1)
                setHasMore(data.has_more)
            }
        } catch (err) {

        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        setRouterPage(0)

        getAllVideos()
    }, [])

    return (
        <div className="main-page__home">
            {!isLoading && (
                <ul className="video-list list-row row">
                    {videos?.map((video: Video) => (
                        <VideoItem key={video.video} video={video} isRow={false}/>
                    ))}
                </ul>
            )}

            {!isLoading && !videos?.length && <MainEmpty/>}

            {isLoading && <ListRowSkeleton/>}

            <button style={{display: hasMore ? 'block' : 'none'}}>Еще</button>
        </div>
    )
}

export default MainPage;