import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "../store";
import {ResponseVideos} from "../types/responseVideos.ts";

import {
    setSearchTitle,
    setVideos,
    setPage,
    setHasMore,
    setTotal,
} from "../store/useSearchStore.ts";
import {apiGetVideoByTitle} from "../api/search/search.ts";

export const useSearch = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        searchTitle,
        videos: searchVideos,
        page,
        total,
        has_more,
    } = useSelector((state: RootState) => state.search)

    const getSearchVideos = async (title: string) => {
        try {
            const data: ResponseVideos = await apiGetVideoByTitle(title);

            dispatch(setVideos(data.videos));
            dispatch(setPage(page + 1))
            dispatch(setTotal(data.total))
            dispatch(setHasMore(data.has_more))
        } catch (err) {
            console.log(err)
        }
    }

    return {
        searchTitle,
        searchVideos,

        page,
        total,
        has_more,

        setSearchTitle: (title: string) => dispatch(setSearchTitle(title)),
        getSearchVideos,
    }
}