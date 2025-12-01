import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "../store";
import {setSearchTitle} from "../store/useSearchStore.ts";

export const useSearch = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {searchTitle} = useSelector((state: RootState) => state.search)

    return {
        searchTitle,

        setSearchTitle: (title: string) => dispatch(setSearchTitle(title)),
    }
}