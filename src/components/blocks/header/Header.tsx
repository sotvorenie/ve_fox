import HeaderSearch from "@header/HeaderSearch";
import HeaderNavigation from "@header/HeaderNavigation";
import HeaderUser from "@header/HeaderUser";


interface Props {
    readonly isVideoPage?: boolean
}

function Header({isVideoPage = false}: Props) {

    return(
        <header className={
            `header flex flex-align-center flex-justify-center 
            ${!isVideoPage && "position-sticky"}`
        }>
            {isVideoPage && <HeaderNavigation/>}

            <HeaderSearch/>

            <HeaderUser/>
        </header>
    )
}

export default Header;