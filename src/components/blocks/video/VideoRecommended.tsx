import {Video} from "../../../types/video.ts";

import {replaceLines, sliceString} from "../../../composables/useRedactVideoName.ts";
import {redactDate} from "../../../composables/useRedactDate.ts";

import {useVideos} from "../../../hooks/useVideos.ts";
import {useVideo} from "../../../hooks/useVideo.ts";

function VideoRecommended() {
    const {allVideos} = useVideos()
    const {handleVideo} = useVideo()

    return (
        <ul className="recommended">
            {allVideos.length ? allVideos.map((video: Video) => (
                <li className="recommended__item flex cursor-pointer"
                    key={video.video}
                    onClick={() => handleVideo(video)}
                >
                    <div className="recommended__preview img-container">
                        <img src={video.preview} alt={video.name} loading="lazy"/>
                    </div>
                    <div className="recommended__info">
                        <div className="recommended__text flex flex-column">
                            <span className="recommended__title">
                                {replaceLines(sliceString(video.name, 34))}
                            </span>
                            <span className="recommended__channel">{video.channel}</span>
                            <span className="recommended__date">{redactDate(video.date)}</span>
                        </div>
                    </div>
                </li>
            )) : (<div>нет видео</div>)}
        </ul>
    )
}

export default VideoRecommended;