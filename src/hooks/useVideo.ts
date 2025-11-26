import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "../store";
import {setVideo} from "../store/useVideoStore.ts";
import {Video} from "../types/video.ts";

export const useVideo = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {video} = useSelector((state: RootState) => state.video);

    return {
        video,

        setVideo: (video: Video) => dispatch(setVideo(video)),
    }
}