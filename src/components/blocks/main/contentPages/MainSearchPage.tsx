import {useVideos} from "../../../../hooks/useVideos.ts";
import {Video} from "../../../../types/video.ts";
import VideoItem from "../../../common/VideoItem.tsx";

function MainSearchPage() {
    const {searchVideos} = useVideos()

    return (
        <ul className="video-list list-column">
            {searchVideos.length ? searchVideos.map((video: Video) => (
                <VideoItem key={video.video} video={video}/>
            )) : (<div>видев нет</div>)}
        </ul>
    )
}

export default MainSearchPage;