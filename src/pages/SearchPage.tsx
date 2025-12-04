import {Video} from "../types/video.ts";
import {useState} from "react";

import VideoItem from "../components/common/VideoItem.tsx";

import {useSearch} from "../hooks/useSearch.ts";

function SearchPage() {
    const {
        videos,
        total,
        hasMore,
    } = useSearch();

    const [page, setPage] = useState(2);

    return (
        <div className="search-page">
            <p className="search-page__total h6">Найдено {total} видео</p>

            <ul className="video-list list-column m-auto">
                {videos.length ? videos.map((video: Video) => (
                    <VideoItem key={video.video} video={video} isRow={true}/>
                )) : (<div>видев нет</div>)}
            </ul>

            {hasMore && <button>Загрузить еще</button>}
        </div>
    )
}

export default SearchPage;