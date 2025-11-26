import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "../store";
import {setPageName} from "../store/useMainPagesStore.ts";

export const useMainPages = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {pageName, pageList} = useSelector((state: RootState) => state.mainPages)

    return {
        pageName,
        pageList,

        setPageName: (name: string) => dispatch(setPageName(name)),
    }
}