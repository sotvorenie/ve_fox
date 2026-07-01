import {Link, Outlet, useNavigate} from "react-router-dom";

import {Menu} from "@/types/menu";

import menuItems from "@data/menuLinks";

import Header from "@header/Header";

import Logo from "@icons/Logo";

import {usePagesStore} from "@store/usePagesStore";
import {useUserStore} from "@store/useUserStore";

function MainLayout() {
    const navigate = useNavigate();

    const {isLogged} = useUserStore()
    const {page} = usePagesStore()

    const pages: string[] = [
        "/",
        "/history",
        "/liked",
        "/watch_later"
    ]

    const handleMenuItem = (index: number): void => {
        navigate(pages[index])
    }

    return (
        <div className="main-layout flex h-100">
            <aside className="main-layout__menu menu h-100">
                <Link to="/"
                      className="menu__logo button-width-svg flex flex-align-center"
                      type="button"
                >
                    <Logo/>
                    <p className="h4">veFox</p>
                </Link>

                <ul className="menu__list">
                    {menuItems.map((item: Menu, index: number) => (
                        <li key={item.title} className="menu__item">
                            <button
                                className={`
                                    menu__btn w-100 flex flex-align-center recolor-svg hover-color-accent text-nowrap
                                    ${index === page && 'is-active'}
                                    ${!isLogged && index > 0 ? 'pointer-none' : ''}
                                `}
                                type="button"
                                onClick={() => handleMenuItem(index)}
                            >
                                <item.icon style={{fill: 'currentColor'}}></item.icon>
                                <span>{item.title}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            <div className="main-layout__right w-100 flex flex-column">
                <Header/>

                <div className="main-layout__content">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default MainLayout;