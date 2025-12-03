import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {
    setSearch,
    setVideos,
    setPage,
    setHasMore,
    setTotal
} from "../store/useSearchStore.ts";
import {ResponseVideos} from "../types/responseVideos.ts";
import {apiGetVideoByTitle} from "../api/search/search.ts";

export const useSearch = () => {
    const dispatch = useDispatch();
    const {
        search,
        videos,
        total,
        hasMore,
        page
    } = useSelector((state: RootState) => state.search);

    const getSearchVideos = async () => {
        try {
            const data: ResponseVideos = await apiGetVideoByTitle(search)

            if (data) {
                dispatch(setVideos(data.videos))
                dispatch(setPage(page + 1))
                dispatch(setHasMore(data.has_more))
                dispatch(setTotal(data.total))
            }
        } catch (err) {

        }
    }

    return {
        search,
        videos,
        total,
        hasMore,

        setSearch: (search: string) => dispatch(setSearch(search)),

        getSearchVideos
    }
}