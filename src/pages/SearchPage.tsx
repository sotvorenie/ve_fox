import {useEffect} from "react";
import {Link} from "react-router-dom";

import {ChannelForList} from "@/types/channel";
import {VideoForList} from "@/types/video";


import VideoItem from "@common/VideoItem";
import ListColumnSkeleton from "@ui/skeletons/ListColumnSkeleton";

import {useSearchStore} from "@store/useSearchStore";
import {usePagesStore} from "@store/usePagesStore";

function SearchPage() {
    const {
        isLoading,
        total,
        channels,
        videos,
        hasMore,
        search
    } = useSearchStore()
    const {setPage} = usePagesStore()

    useEffect(() => {
        if (!videos?.length) {
            setPage(-1)
            search().catch(() => {})
        }
    }, []);

    return (
        <div className="margin-center-page">
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