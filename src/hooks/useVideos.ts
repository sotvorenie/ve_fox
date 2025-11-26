import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "../store";
import {setVideos} from "../store/useVideosStore.ts";
import {apiGetAllVideos} from "../api/videos/videos.ts";

export const useVideos = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {allVideos} = useSelector((state: RootState) => state.videos)

    const getAllVideos = async () => {
        try {
            const videos = await apiGetAllVideos();
            dispatch(setVideos(videos));
        } catch (err) {
            console.log(err)
        }
    }

    return {
        allVideos,

        setVideos: (videos: any[]) => dispatch(setVideos(videos)),
        getAllVideos,
    }
}