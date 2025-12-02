import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

import {useMainPages} from "../../../hooks/useMainPages.ts";

import MainHeader from "./header/MainHeader.tsx";
import MainHomePage from "./pages/MainHomePage.tsx";
import MainSearchPage from "./pages/MainSearchPage.tsx";
import MainChannelPage from "./pages/MainChannelPage.tsx";

function MainContent() {
    const {pageName, pageList, setPageName} = useMainPages()

    const [searchParams, _] = useSearchParams()

    useEffect(() => {
        if (searchParams.get('page') && searchParams.get('page') === 'channel') {
            setPageName(pageList.channel)
        }
    }, []);

    return (
        <div className="main-page__right position-relative">
            <MainHeader/>

            <div className="main-page__content">
                {(pageName === pageList.home || pageName === "") && <MainHomePage/>}
                {pageName === pageList.search && <MainSearchPage/>}
                {pageName === pageList.channel && <MainChannelPage/>}
            </div>
        </div>
    );
}

export default MainContent;