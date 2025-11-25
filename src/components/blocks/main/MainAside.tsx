import {Link} from "react-router-dom";

import {Menu} from "../../../types/menu.ts";

import menuItems from "../../../data/main/menuAside.ts";

import Logo from "../../../assets/images/Logo.tsx";

function MainAside() {


    return (
        <aside className="menu">
            <Link to="/" className="menu__logo button-width-svg flex flex-align-center">
                <Logo/>
                <p className="h4">veFox</p>
            </Link>

            <ul className="menu__list">
                {menuItems.map((item: Menu) => (
                    <li key={item.title} className="menu__item">
                        <button className="menu__btn flex flex-align-center recolor-svg hover-color-accent text-nowrap"
                                type="button"
                        >
                            <item.icon style={{fill: 'none'}}></item.icon>
                            <span>{item.title}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default MainAside;