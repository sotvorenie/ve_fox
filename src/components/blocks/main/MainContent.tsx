

import MainHeader from "./MainHeader.tsx";
import MainHomePage from "./contentPages/MainHomePage.tsx";

function MainContent() {


    return (
        <div className="main-page__right position-relative">
            <MainHeader/>

            <div className="main-page__content">
                <MainHomePage/>
            </div>
        </div>
    );
}

export default MainContent;