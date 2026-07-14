import {useEffect, useState} from "react";

import {VideoForList, VideosList} from "@/types/video";

import {apiGetHistory} from "@api/history/history";
import {apiGetListLikes} from "@api/like/like";
import {apiGetListWatchLater} from "@api/watch_later/watchLater";

import VideoItem from "@video/VideoItem";
import ListColumnSkeleton from "@ui/skeletons/ListColumnSkeleton";

import {usePagesStore} from "@store/usePagesStore";

interface Props {
    readonly name: string;
    readonly index: number;
}

function MainPageDefault({name, index}: Props) {
    const {setPage} = usePagesStore()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [videos, setVideos] = useState<VideoForList[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);
    const [responsePage, setResponsePage] = useState<number>(1);

    const getVideos = async () => {
        try {
            setIsLoading(true)

            let data: VideosList

            switch (name) {
                case 'history':
                    data = await apiGetHistory(responsePage)
                    break
                case 'liked':
                    data = await apiGetListLikes(responsePage)
                    break
                case 'watch_later':
                    data = await apiGetListWatchLater(responsePage)
                    break
                default:
                    data = await apiGetHistory(responsePage)
            }

            if (data) {
                setVideos(data.videos)
                setHasMore(data.has_more)
                setTotal(data.total)
                setResponsePage(data.page + 1)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const clearData = () => {
        setVideos([])
        setHasMore(false)
        setTotal(0)
        setResponsePage(1)
    }

    useEffect(() => {
        clearData()
        setPage(index)
        getVideos().catch(() => {})
    }, [])

    return (
        <div className="margin-center-page">
            <p className="total h6">Найдено {total} видео</p>

            {!isLoading && (
                <ul className="w-100">
                    {videos?.map((video: VideoForList) => (
                        <VideoItem key={video.id} video={video} isRow={true}/>
                    ))}
                </ul>
            )}

            {isLoading && <ListColumnSkeleton isRecommended={false}/>}

            {hasMore && <button>Загрузить еще</button>}
        </div>
    )
}

export default MainPageDefault;