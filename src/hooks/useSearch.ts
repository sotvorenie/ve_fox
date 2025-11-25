import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {clearSearchName, setSearchName} from "../store/useSearchStore.ts";

export const useSearch = () => {
    const dispatch = useDispatch();
    const searchName = useSelector((state: RootState) => state.search.searchName);

    return {
        searchName,
        setSearchName: (text: string) => dispatch(setSearchName(text)),
        clearSearchName: () => dispatch(clearSearchName()),
    }
}