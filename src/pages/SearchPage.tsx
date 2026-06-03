import {useEffect} from "react";
import {Link} from "react-router-dom";
import { useShallow } from 'zustand/react/shallow';

import {ChannelForList} from "../types/channel.ts";
import {VideoForList} from "../types/video.ts";


import VideoItem from "../components/common/VideoItem.tsx";
import ListColumnSkeleton from "../components/ui/skeletons/ListColumnSkeleton.tsx";

import {useSearchStore} from "../store/useSearchStore.ts";
import {usePagesStore} from "../store/usePagesStore.ts";

function SearchPage() {
    const {
        isLoading,
        total,
        channels,
        videos,
        hasMore,
        search
    } = useSearchStore(useShallow((state) => ({ ...state })))
    const {setPage} = usePagesStore(useShallow((state) => ({ ...state })))

    useEffect(() => {
        if (!videos?.length) {
            setPage(-1)
            search().catch(() => {})
        }
    }, []);

    return (
        <div className="search-page">
            <p className="total h6">Найдено {total} видео</p>

            {!isLoading && (
                <ul className="search-page__channels m-auto">
                    {channels?.map((channel: ChannelForList) => (
                        <li className="search-page__channel" key={channel.id}>
                            <Link to={`/channel/${channel.id}`}>
                                <div className="search-page__channel-avatar">
                                    <img src={channel?.avatar_url} alt={channel?.name}/>
                                </div>
                                <span className="search-page__channel-name h4">{channel?.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

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

export default SearchPage;