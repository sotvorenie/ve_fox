import {useState} from "react";
import {useNavigate} from "react-router-dom";

import useWidthWatcher from "@composables/useWidthWatcher";

import ArrowIcon from "@icons/ArrowIcon";
import BurgerIcon from "@icons/BurgerIcon.tsx";
import Aside from "@common/Aside.tsx";
import Portal from "@common/Portal.tsx";

function HeaderNavigation() {
    const navigate = useNavigate();

    const isLaptop: boolean = useWidthWatcher('(max-width: 1440px)')

    const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false)

    return (
        <>
            <Portal>
                <Aside className={`is-absolute position-absolute ${isAsideOpen ? 'is-active' : ''}`}
                       isAbsolute
                       closeFunc={() => setIsAsideOpen(false)}
                />
            </Portal>

            <div className="header__btn-bar flex flex-align-center position-absolute">
                <button className="header__burger-btn button-width-svg recolor-svg hover-color-accent flex-center"
                        type="button"
                        onClick={() => setIsAsideOpen(true)}
                >
                    <BurgerIcon/>
                </button>

                <button className="header__back flex flex-align-center recolor-svg hover-color-accent"
                        onClick={() => navigate(-1)}
                        title={isLaptop ? 'Назад' : ''}
                        type="button"
                >
                    <ArrowIcon/>
                    <span className="h5">Назад</span>
                </button>

                <button className="header__forward flex flex-align-center recolor-svg hover-color-accent"
                        onClick={() => navigate(+1)}
                        title={isLaptop ? 'Вперед' : ''}
                        type="button"
                >
                    <ArrowIcon/>
                    <span className="h5">Вперед</span>
                </button>
            </div>
        </>
    )
}

export default HeaderNavigation;