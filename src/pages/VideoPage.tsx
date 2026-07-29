import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {VideoResponse} from "@/types/video";

import {apiGetVideo} from "@api/video/video";

import Header from "@header/Header";
import VideoMain from "@video/VideoMain";
import VideoRecommended from "@video/VideoRecommended";

import {useVideoStore} from "@store/useVideoStore";
import {usePlayerStore} from "@store/usePlayerStore";
import {useUserStore} from "@store/useUserStore";

function VideoPage() {
    const { id } = useParams<{ id: string }>();

    const {
        clearVideo,
        setVideo,
        setIsLoading,
        getRecommendedVideos,
    } = useVideoStore()
    const {setVolume} = usePlayerStore()
    const {isLogged} = useUserStore()

    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [isWatchLater, setIsWatchLater] = useState<boolean>(false)
    const [savedTime, setSavedTime] = useState<number>(0)

    const getVideo = async () => {
        try {
            setIsLoading(true)
            clearVideo()
            if (id) {
                const response: VideoResponse = await apiGetVideo(+id)
                if (response) {
                    setVideo(response.video)
                    if (isLogged) {
                        setIsLiked(response.isLiked)
                        setSavedTime(response.savedTime)
                        setIsWatchLater(response.isWatchLater)
                    }
                }
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const updateVideo = async (id: number) => {
        await getVideo()

        await getRecommendedVideos(+id).then()
    }

    useEffect(() => {
        if (id) updateVideo(+id).catch(() => {})
    }, [id])

    useEffect(() => {
        const volume = JSON.parse(localStorage.getItem('volume') || '1')
        setVolume(volume)

        return () => {
            clearVideo()
        }
    }, [])

    return(
        <div className="video-page h-100">
            <Header visibleNavigation={true}/>

            <div className="video-page__content flex h-100">
                <VideoMain isLiked={isLiked}
                           setIsLiked={setIsLiked}
                           isWatchLater={isWatchLater}
                           setIsWatchLater={setIsWatchLater}
                           savedTime={savedTime}
                />

                <VideoRecommended id={id}/>
            </div>
        </div>
    );
}

export default VideoPage;