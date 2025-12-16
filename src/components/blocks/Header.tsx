import HeaderSearch from "./header/HeaderSearch.tsx";
import HeaderNavigation from "./header/HeaderNavigation.tsx";
import HeaderUser from "./header/HeaderUser.tsx";


interface Props {
    isVideoPage?: boolean
}

function Header({isVideoPage = false}: Props) {

    return(
        <header className={
            `header flex flex-align-center flex-justify-center 
            ${!isVideoPage && "position-sticky"}`
        }>
            <HeaderNavigation isVideoPage={isVideoPage}/>

            <HeaderSearch/>

            <HeaderUser/>
        </header>
    )
}

export default Header;