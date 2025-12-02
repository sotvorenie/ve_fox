import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "../store";
import {setVideo, setVideoHistory, clearVideoHistory, setActiveVideoFromHistory} from "../store/useVideoStore.ts";
import {Video} from "../types/video.ts";

export const useVideo = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {video,
        videoHistory,
        activeVideoFromHistory
    } = useSelector((state: RootState) => state.video);

    const handleVideo = (video: Video): void => {
        dispatch(setVideo(video))
        dispatch(setVideoHistory(video))
        dispatch(setActiveVideoFromHistory(activeVideoFromHistory + 1))
    }

    return {
        video,
        videoHistory,
        activeVideoFromHistory,

        setVideo: (video: Video) => dispatch(setVideo(video)),
        setVideoHistory: (video: Video) => dispatch(setVideoHistory(video)),
        setActiveVideoFromHistory: (index: number) => dispatch(setActiveVideoFromHistory(index)),
        clearVideoHistory: () => dispatch(clearVideoHistory()),
        handleVideo,
    }
}