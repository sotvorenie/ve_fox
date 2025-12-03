import {Link, Outlet} from "react-router-dom";

import {Menu} from "../types/menu.ts";

import menuItems from "../data/main/menuAside.ts";

import Header from "../components/common/Header.tsx";

import Logo from "../assets/images/Logo.tsx";

function MainLayout() {

    return (
        <div className="main-layout flex">
            <aside className="main-layout__menu menu">
                <Link to="/" className="menu__logo button-width-svg flex flex-align-center"
                        type="button"
                >
                    <Logo/>
                    <p className="h4">veFox</p>
                </Link>

                <ul className="menu__list">
                    {menuItems.map((item: Menu) => (
                        <li key={item.title} className="menu__item">
                            <button
                                className="menu__btn flex flex-align-center recolor-svg hover-color-accent text-nowrap"
                                type="button"
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