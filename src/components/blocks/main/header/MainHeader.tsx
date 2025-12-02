import MainHeaderSearch from "./MainHeaderSearch.tsx";
import MainHeaderNavigation from "./MainHeaderNavigation.tsx";
import MainHeaderUser from "./MainHeaderUser.tsx";


interface Props {
    isVideoPage?: boolean
}

function MainHeader({isVideoPage = false}: Props) {

    return(
        <header className="header flex flex-align-center flex-justify-center position-sticky">
            <MainHeaderNavigation isVideoPage={isVideoPage}/>

            <MainHeaderSearch/>

            <MainHeaderUser/>
        </header>
    )
}

export default MainHeader;