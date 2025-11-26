import MainAside from "../components/blocks/main/MainAside.tsx";
import MainContent from "../components/blocks/main/MainContent.tsx";

function MainPage() {


    return (
        <div className="main-page flex">
            <MainAside/>
            <MainContent/>
        </div>
    );
}

export default MainPage;