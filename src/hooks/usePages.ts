import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {setRouterPage} from "../store/usePagesStore.ts";

export const usePages = () => {
    const dispatch = useDispatch();
    const {page} = useSelector((state: RootState) => state.pages)

    return {
        page,

        setRouterPage: (page: number) => dispatch(setRouterPage(page)),
    }
}