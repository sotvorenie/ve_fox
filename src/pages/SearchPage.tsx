import {Video} from "../types/video.ts";
import {useEffect, useState} from "react";

import VideoItem from "../components/common/VideoItem.tsx";
import ListColumnSkeleton from "../components/ui/skeletons/ListColumnSkeleton.tsx";

import {useSearch} from "../hooks/useSearch.ts";
import {usePages} from "../hooks/usePages.ts";

function SearchPage() {
    const {
        videos,
        total,
        hasMore,
        isLoading,
        getSearchVideos
    } = useSearch();
    const {setRouterPage} = usePages()

    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!videos?.length) {
            getSearchVideos(page)
        }

        setRouterPage(-1)
    }, []);

    return (
        <div className="search-page">
            <p className="total h6">Найдено {total} видео</p>

            {!isLoading && (
                <ul className="video-list list-column m-auto">
                    {videos?.map((video: Video) => (
                        <VideoItem key={video.video} video={video} isRow={true}/>
                    ))}
                </ul>
            )}

            {isLoading && <ListColumnSkeleton/>}

            {hasMore && <button>Загрузить еще</button>}
        </div>
    )
}

export default SearchPage;