import HeaderSearch from "@/components/blocks/header/HeaderSearch.tsx";
import HeaderNavigation from "@/components/blocks/header/HeaderNavigation.tsx";
import HeaderUser from "@/components/blocks/header/HeaderUser.tsx";


interface Props {
    readonly isVideoPage?: boolean
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