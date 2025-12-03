import HeaderSearch from "../blocks/header/HeaderSearch.tsx";
import HeaderNavigation from "../blocks/header/HeaderNavigation.tsx";
import HeaderUser from "../blocks/header/HeaderUser.tsx";


interface Props {
    isVideoPage?: boolean
}

function Header({isVideoPage = false}: Props) {

    return(
        <header className="header flex flex-align-center flex-justify-center position-sticky">
            <HeaderNavigation isVideoPage={isVideoPage}/>

            <HeaderSearch/>

            <HeaderUser/>
        </header>
    )
}

export default Header;