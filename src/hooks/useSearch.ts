import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {
    setSearch,
    setVideos,
    setTotal,
    setHasMore
} from "../store/useSearchStore.ts";
import {ResponseVideos} from "../types/responseVideos.ts";
import {apiGetVideoByTitle} from "../api/search/search.ts";

export const useSearch = () => {
    const dispatch = useDispatch();
    const {
        search,
        videos,
        hasMore,
        total
    } = useSelector((state: RootState) => state.search);

    const getSearchVideos = async (page: number = 1) => {
        try {
            const data: ResponseVideos = await apiGetVideoByTitle(search, page)

            if (data) {
                dispatch(setVideos(data.videos))
                dispatch(setTotal(data.total))
                dispatch(setHasMore(data.has_more))
            }
        } catch (err) {

        }
    }

    return {
        search,
        videos,
        hasMore,
        total,

        setSearch: (search: string) => dispatch(setSearch(search)),

        getSearchVideos
    }
}