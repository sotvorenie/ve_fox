import {useMainPages} from "../../../hooks/useMainPages.ts";

import MainHeader from "./MainHeader.tsx";
import MainHomePage from "./contentPages/MainHomePage.tsx";
import MainSearchPage from "./contentPages/MainSearchPage.tsx";
import MainChannelPage from "./contentPages/MainChannelPage.tsx";

function MainContent() {
    const {pageName, pageList} = useMainPages()

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