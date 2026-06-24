import {Link, useNavigate} from "react-router-dom";

import useWidthWatcher from "@/composables/useWidthWatcher.ts";

import ArrowIcon from "@/assets/images/icons/ArrowIcon.tsx";
import Logo from "@/assets/images/Logo.tsx";

interface Props {
    readonly isVideoPage?: boolean
}

function HeaderNavigation({isVideoPage = false}: Props) {
    const navigate = useNavigate();

    const isLaptop: boolean = useWidthWatcher('(max-width: 1440px)')

    return (
        <>
            {isVideoPage &&
                <div className="header__btn-bar flex flex-align-center position-absolute">
                    <button className="header__back flex flex-align-center recolor-svg cursor-pointer"
                            onClick={() => navigate(-1)}
                            title={isLaptop ? 'Назад' : ''}
                            type="button"
                    >
                        <ArrowIcon/>
                        <span className="h5">Назад</span>
                    </button>

                    <button className="header__forward flex flex-align-center recolor-svg cursor-pointer"
                            onClick={() => navigate(+1)}
                            title={isLaptop ? 'Вперед' : ''}
                            type="button"
                    >
                        <ArrowIcon/>
                        <span className="h5">Вперед</span>
                    </button>

                    <Link to="/"
                          className="header__logo button-width-svg flex-center cursor-pointer"
                          title="На главную"
                    >
                        <Logo/>
                    </Link>
                </div>
            }
        </>
    )
}

export default HeaderNavigation;