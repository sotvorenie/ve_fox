import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "../store";
import {setSearchTitle, setSearchVideos} from "../store/useSearchStore.ts";
import {apiGetVideoByTitle} from "../api/videos/videos.ts";

export const useSearch = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {searchTitle, searchVideos} = useSelector((state: RootState) => state.search)

    const getSearchVideos = async (title: string) => {
        try {
            const videos = await apiGetVideoByTitle(title);
            dispatch(setSearchVideos(videos));
        } catch (err) {
            console.log(err)
        }
    }

    return {
        searchTitle,
        searchVideos,

        setSearchTitle: (title: string) => dispatch(setSearchTitle(title)),
        getSearchVideos,
    }
}