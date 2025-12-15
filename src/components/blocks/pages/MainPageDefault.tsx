import {useEffect, useState} from "react";

import {Video} from "../../../types/video.ts";
import {Meta} from "../../../types/meta.ts";

import {getVideosFromTable} from "../../../api/local_database";

import VideoItem from "../../common/VideoItem.tsx";
import ListColumnSkeleton from "../../ui/skeletons/ListColumnSkeleton.tsx";

import {usePages} from "../../../hooks/usePages.ts";

interface Props {
    name: string;
    index: number;
}

function MainPageDefault({name, index}: Props) {
    const {setRouterPage} = usePages()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1);
    const [videos, setVideos] = useState<Video[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);

    const getVideos = async () => {
        try {
            setIsLoading(true)

            const items: {meta: Meta, videos: Video[]} = await getVideosFromTable(page, name)

            const meta: Meta = items.meta
            setVideos(items.videos)

            setHasMore(meta.has_more)
            setTotal(meta.total)
            setPage(2)
        } catch (err) {

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setRouterPage(index)

        getVideos()
    }, []);

    return (
        <div className="history-page">
            <p className="total h6">Найдено {total} видео</p>

            {!isLoading && (
                <ul className="video-list list-column m-auto">
                    {videos?.map((video: Video) => (
                        <VideoItem key={video.video_path} video={video} isRow={true}/>
                    ))}
                </ul>
            )}

            {isLoading && <ListColumnSkeleton/>}

            {hasMore && <button>Загрузить еще</button>}
        </div>
    )
}

export default MainPageDefault;