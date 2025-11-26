import {Link} from "react-router-dom";
import {Video} from "../../types/video.ts";
import {useVideo} from "../../hooks/useVideo.ts";
import {replaceLines, sliceString} from "../../composables/useRedactVideoName.ts";
import {redactDate} from "../../composables/useRedactDate.ts";

interface Props {
    video: Video;
}

function VideoItem({video}: Props) {
    const {setVideo} = useVideo()

    const handleVideo = (video: Video) => {
        setVideo(video)
    }

    return (
        <Link to="/video"
              className="video-list__item col-4"
              onClick={() => handleVideo(video)}
        >
            <li>
                <div className="video-list__preview img-container">
                    <img src={video.preview} alt={video.name} loading="lazy"/>
                </div>
                <div className="video-list__info">
                    <div className="video-list__avatar img-container">
                        {video.avatar ?
                            (<img src={video.avatar} alt={video.channel}/>) :
                            (<span>{video.channel.slice(0, 1)}</span>)
                        }
                    </div>

                    <div className="video-list__text">
                                    <span className="video-list__title">
                                        {replaceLines(sliceString(video.name, 90))}
                                    </span>
                        <span className="video-list__channel">{video.channel}</span>
                        <span className="video-list__date">{redactDate(video.date)}</span>
                    </div>
                </div>
            </li>
        </Link>
    )
}

export default VideoItem;