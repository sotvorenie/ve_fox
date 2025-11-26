import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "../store";
import {setVideos, setSearchVideos} from "../store/useVideosStore.ts";
import {apiGetAllVideos, apiGetVideoByTitle} from "../api/videos/videos.ts";

export const useVideos = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {allVideos, searchVideos} = useSelector((state: RootState) => state.videos)

    const getAllVideos = async () => {
        try {
            const videos = await apiGetAllVideos();
            dispatch(setVideos(videos));
        } catch (err) {
            console.log(err)
        }
    }

    const getSearchVideos = async (title: string) => {
        try {
            const videos = await apiGetVideoByTitle(title);
            dispatch(setSearchVideos(videos));
        } catch (err) {
            console.log(err)
        }
    }

    return {
        allVideos,
        searchVideos,

        setVideos: (videos: any[]) => dispatch(setVideos(videos)),
        getAllVideos,
        getSearchVideos,
    }
}