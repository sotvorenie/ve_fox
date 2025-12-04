import {Video} from "../types/video.ts";
import {useEffect, useState} from "react";

import VideoItem from "../components/common/VideoItem.tsx";
import ListColumnSkeleton from "../components/ui/skeletons/ListColumnSkeleton.tsx";

import {useSearch} from "../hooks/useSearch.ts";

function SearchPage() {
    const {
        videos,
        total,
        hasMore,
        isLoading,
        getSearchVideos
    } = useSearch();

    const [page, setPage] = useState(2);

    useEffect(() => {
        if (!videos?.length) {
            console.log('привет')
            getSearchVideos(1)
        }
    }, []);

    return (
        <div className="search-page">
            <p className="search-page__total h6">Найдено {total} видео</p>

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