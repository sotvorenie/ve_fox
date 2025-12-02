import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "../store";
import {ResponseVideos} from "../types/responseVideos.ts";
import {
    setVideos,
    setPage,
    setHasMore,
    setTotal,
} from "../store/useVideosStore.ts";
import {apiGetAllVideos} from "../api/videos/videos.ts";

export const useVideos = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        videos,
        page,
        total,
        has_more
    } = useSelector((state: RootState) => state.videos)

    const getAllVideos = async () => {
        try {
            const data: ResponseVideos = await apiGetAllVideos();

            dispatch(setVideos(data.videos));
            dispatch(setPage(page + 1))
            dispatch(setTotal(data.total))
            dispatch(setHasMore(data.has_more))
        } catch (err) {
            console.log(err)
        }
    }

    return {
        videos,

        page,
        total,
        has_more,

        setVideos: (videos: any[]) => dispatch(setVideos(videos)),
        getAllVideos,
    }
}