import {Video} from "../../../../types/video.ts";

import VideoItem from "../../../common/VideoItem.tsx";

import {useSearch} from "../../../../hooks/useSearch.ts";

function MainSearchPage() {
    const {searchVideos} = useSearch();

    return (
        <div className="main-page__search">
            <ul className="video-list list-column m-auto">
                {searchVideos.length ? searchVideos.map((video: Video) => (
                    <VideoItem key={video.video} video={video} isRow={true}/>
                )) : (<div>видев нет</div>)}
            </ul>
        </div>
    )
}

export default MainSearchPage;