import {useEffect, useState} from "react";

import {VideoForList, VideosList} from "@/types/video";

import {apiGetAllVideos} from "@api/video/video";

import VideoItem from "@common/VideoItem";
import ListRowSkeleton from "@ui/skeletons/ListRowSkeleton";
import MainEmpty from "@ui/empty/mainEmpty";

import {usePagesStore} from "@store/usePagesStore";

function MainPage() {
    const {setPage: setRouterPage} = usePagesStore()

    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [videos, setVideos] = useState<VideoForList[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const seed: number = Math.random() * 2 - 1

    const getAllVideos = async (): Promise<void> => {
        if (!hasMore) return

        try {
            setIsLoading(true)

            const data: VideosList = await apiGetAllVideos(page, 21, seed)

            if (data) {
                setVideos(data.videos)
                setPage(page + 1)
                setHasMore(data.has_more)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        setRouterPage(0)

        getAllVideos().then(() => {})
    }, [])

    return (
        <div className="main-page__home h-100">
            {!isLoading && (
                <ul className="video-list row">
                    {videos?.map((video: VideoForList) => (
                        <VideoItem key={video.id} className="col-4" video={video} isRow={false}/>
                    ))}
                </ul>
            )}

            {!isLoading && !videos?.length && <MainEmpty/>}

            {isLoading && <ListRowSkeleton/>}
        </div>
    )
}

export default MainPage;