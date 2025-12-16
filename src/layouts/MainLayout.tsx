import {Link, Outlet, useNavigate} from "react-router-dom";

import {Menu} from "../types/menu.ts";

import menuItems from "../data/menuLinks.ts";

import Header from "../components/blocks/Header.tsx";

import Logo from "../assets/images/Logo.tsx";

import {usePages} from "../hooks/usePages.ts";

function MainLayout() {
    const navigate = useNavigate();

    const {page} = usePages()

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
        <div className="main-layout flex">
            <aside className="main-layout__menu menu">
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
                                    menu__btn flex flex-align-center recolor-svg hover-color-accent text-nowrap
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

            <div className="main-layout__right">
                <Header/>

                <div className="main-layout__content">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default MainLayout;