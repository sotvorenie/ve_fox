import {Menu} from "../../../types/menu.ts";

import menuItems from "../../../data/main/menuAside.ts";

import {useMainPages} from "../../../hooks/useMainPages.ts";

import Logo from "../../../assets/images/Logo.tsx";

function MainAside() {
    const {pageList, setPageName} = useMainPages();

    const handleLogo = () => {
        setPageName(pageList.home)
    }

    return (
        <aside className="menu">
            <button className="menu__logo button-width-svg flex flex-align-center"
                    type="button"
                    onClick={handleLogo}
            >
                <Logo/>
                <p className="h4">veFox</p>
            </button>

            <ul className="menu__list">
                {menuItems.map((item: Menu) => (
                    <li key={item.title} className="menu__item">
                        <button className="menu__btn flex flex-align-center recolor-svg hover-color-accent text-nowrap"
                                type="button"
                        >
                            <item.icon style={{fill: 'currentColor'}}></item.icon>
                            <span>{item.title}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default MainAside;