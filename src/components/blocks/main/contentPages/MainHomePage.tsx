import {useEffect} from "react";
import {Link} from "react-router-dom";

import {Video} from "../../../../types/video.ts";

import {replaceLines, sliceString} from "../../../../composables/useRedactVideoName.ts";
import {redactDate} from "../../../../composables/useRedactDate.ts";

import {useVideos} from "../../../../hooks/useVideos.ts";
import {useVideo} from "../../../../hooks/useVideo.ts";

function MainHomePage() {
    const {allVideos, getAllVideos} = useVideos();
    const {setVideo} = useVideo()

    const handleVideo = (video: Video) => {
        setVideo(video)
    }

    useEffect(() => {
        getAllVideos()
    }, [])

    return(
        <>
            <ul className="video-list list-row row">
                {allVideos.length ? allVideos.map((video: Video) => (
                    <Link to="/video"
                          key={video.video}
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
                )) : (<div>видев нет</div>)}
            </ul>
        </>
    )
}

export default MainHomePage;