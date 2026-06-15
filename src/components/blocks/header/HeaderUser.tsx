import {ComponentType, SVGProps, useState} from "react";
import {MouseEvent} from "react";

import Portal from "../../common/Portal.tsx";
import SettingsRedactUser from "../settings/settingsRedactUser.tsx";

import avatarImage from "../../../assets/images/аватар.webp";
import SettingsIcon from "../../../assets/images/icons/video-player/SettingsIcon.tsx";
import UploadIcon from "../../../assets/images/icons/UploadIcon.tsx";
import FilmIcon from "../../../assets/images/icons/FilmIcon.tsx";
import UserIcon from "../../../assets/images/icons/UserIcon.tsx";

import {useUserStore} from "../../../store/useUserStore.ts";

interface Button {
    title: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}

function HeaderUser() {
    const {isLogged} = useUserStore()

    const [isVisibleSettings, setIsVisibleSettings] = useState<boolean>(false);

    const [isVisibleRedactUser, setIsVisibleRedactUser] = useState<boolean>(false)

    const settingsButtons: Button[] = [
        {
            title: 'Загрузить видео',
            icon: UploadIcon,
        },
        {
            title: 'Кино',
            icon: FilmIcon,
        },
        {
            title: 'Редактировать профиль',
            icon: UserIcon,
        },
        {
            title: 'Настройки',
            icon: SettingsIcon,
        },
    ]

    const handleButton = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.stopPropagation()

        if (index === 2) {
            setIsVisibleRedactUser(prev => !prev)
        }
    }

    return (
        <div className={`settings ${isVisibleSettings ? 'is-active' : ''}`}>
            <Portal selector=".main-layout__content">
                <button
                    className={`header__avatar img-container cursor-pointer position-absolute ${isVisibleSettings ? 'is-active' : ''}`}
                    type="button"
                    onClick={() => setIsVisibleSettings(prev => !prev)}
                >
                    <img src={avatarImage} alt=""/>
                </button>
            </Portal>

            <Portal selector=".main-layout__content">
                <div
                    className={`settings__inner position-fixed inset-0 z-10000 tr-opacity ${isVisibleSettings ? 'is-active' : ''}`}
                    onClick={() => setIsVisibleSettings(false)}
                >
                    {settingsButtons.map((button: Button, index: number) => {
                        if (index === 0 && !isLogged) return

                        return (
                            <button
                                className={`settings__btn recolor-svg button-width-svg hover-color-accent position-absolute ${isVisibleSettings ? 'is-active' : ''}`}
                                key={button.title}
                                title={button.title}
                                type="button"
                                onClick={(e) => handleButton(e, index)}
                            >
                                <div className="pointer-none flex-center">
                                    <button.icon/>
                                </div>
                            </button>
                        )
                    })}

                    <SettingsRedactUser isVisible={isVisibleRedactUser}/>
                </div>
            </Portal>
        </div>
    )
}

export default HeaderUser;