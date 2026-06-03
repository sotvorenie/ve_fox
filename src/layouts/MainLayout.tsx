import {Link, Outlet, useNavigate} from "react-router-dom";
import {useShallow} from "zustand/react/shallow";

import {Menu} from "../types/menu.ts";

import menuItems from "../data/menuLinks.ts";

import Header from "../components/blocks/header/Header.tsx";

import Logo from "../assets/images/Logo.tsx";

import {usePagesStore} from "../store/usePagesStore.ts";

function MainLayout() {
    const navigate = useNavigate();

    const {page} = usePagesStore(useShallow((state) => ({ ...state })))

    const pages: string[] = [
        "/",
        "/history",
        "/liked",
        "/watch_later"
    ]

    const handleMenuItem = (index: number): void => {
        navigate(pages[index]);
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