import {useEffect, useState} from "react";
import {useShallow} from "zustand/react/shallow";

import {VideoForList, VideosList} from "../types/video.ts";

import {apiGetAllVideos} from "../api/video/video.ts";

import VideoItem from "../components/common/VideoItem.tsx";
import ListRowSkeleton from "../components/ui/skeletons/ListRowSkeleton.tsx";
import MainEmpty from "../components/ui/empty/mainEmpty.tsx";

import {usePagesStore} from "../store/usePagesStore.ts";

function MainPage() {
    const {setPage: setRouterPage} = usePagesStore(useShallow((state) => ({ ...state })))

    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(false)
    const [videos, setVideos] = useState<VideoForList[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const seed: number = Math.random() * 2 - 1

    const getAllVideos = async (): Promise<void> => {
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
                        <VideoItem key={video.id} video={video} isRow={false}/>
                    ))}
                </ul>
            )}

            {!isLoading && !videos?.length && <MainEmpty/>}

            {isLoading && <ListRowSkeleton/>}
        </div>
    )
}

export default MainPage;