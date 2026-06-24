import {useEffect, useState} from "react";
import {useShallow} from "zustand/react/shallow";

import {VideoForList, VideosList} from "@/types/video.ts";

import {apiGetHistory} from "@/api/history/history.ts";
import {apiGetListLikes} from "@/api/like/like.ts";
import {apiGetListWatchLater} from "@/api/watch_later/watchLater.ts";

import VideoItem from "@/components/common/VideoItem.tsx";
import ListColumnSkeleton from "@/components/ui/skeletons/ListColumnSkeleton.tsx";

import {usePagesStore} from "@/store/usePagesStore.ts";

interface Props {
    readonly name: string;
    readonly index: number;
}

function MainPageDefault({name, index}: Props) {
    const {setPage} = usePagesStore(useShallow((state) => ({ ...state })))

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [videos, setVideos] = useState<VideoForList[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);

    const getVideos = async () => {
        try {
            setIsLoading(true)

            let data: VideosList

            switch (name) {
                case 'history':
                    data = await apiGetHistory()
                    break
                case 'like':
                    data = await apiGetListLikes()
                    break
                case 'watch_later':
                    data = await apiGetListWatchLater()
                    break
                default:
                    data = await apiGetHistory()
            }

            if (data) {
                setVideos(data.videos)
                setHasMore(data.has_more)
                setTotal(data.total)
                setPage(data.page + 1)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setPage(index)

        getVideos().catch(() => {})
    }, [])

    return (
        <div className="history-page">
            <p className="total h6">Найдено {total} видео</p>

            {!isLoading && (
                <ul className="video-item m-auto">
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