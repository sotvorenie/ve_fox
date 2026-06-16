import {ComponentType, SVGProps, useState, MouseEvent, useEffect} from "react";

import {BASE_URL} from "../../../api/url.ts";

import Portal from "../../common/Portal.tsx";
import SettingsRedactUser from "../settings/settingsRedactUser.tsx";

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
    const {isLogged, user} = useUserStore()

    const [isVisibleSettings, setIsVisibleSettings] = useState<boolean>(false);

    const [isVisibleRedactUser, setIsVisibleRedactUser] = useState<boolean>(false)

    const [activeBtnIndex, setActiveBtnIndex] = useState<number>(-1)

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

        setActiveBtnIndex(prev => prev === index ? -1 : index)

        if (index === 2) {
            setIsVisibleRedactUser(prev => !prev)
        }
    }

    useEffect(() => {
        if (!isVisibleSettings) {
            setIsVisibleRedactUser(false)
        }
    }, [isVisibleSettings])

    return (
        <div className={`settings ${isVisibleSettings ? 'is-active' : ''}`}>
            <Portal>
                <button
                    className={`header__avatar img-container cursor-pointer position-absolute recolor-svg flex-center ${isVisibleSettings ? 'is-active' : ''}`}
                    type="button"
                    onClick={() => setIsVisibleSettings(prev => !prev)}
                    title={user.name}
                >
                    {user.avatar_url ? (<img src={`${BASE_URL}/${user.avatar_url}`} alt=""/>) : (<UserIcon/>)}
                </button>
            </Portal>

            <Portal>
                <div
                    className={`settings__inner position-fixed inset-0 z-10000 tr-opacity ${isVisibleSettings ? 'is-active' : ''}`}
                    onClick={() => setIsVisibleSettings(false)}
                >
                    {settingsButtons.map((button: Button, index: number) => {
                        if ((index === 0 || index === 2) && !isLogged) return

                        return (
                            <button
                                className={
                                    `settings__btn recolor-svg button-width-svg hover-color-accent position-absolute 
                                    ${isVisibleSettings ? 'is-visible' : ''} 
                                    ${index === activeBtnIndex ? 'is-active' : ''}`
                                }
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

                    <SettingsRedactUser isVisible={isVisibleRedactUser} setIsVisible={setIsVisibleRedactUser}/>
                </div>
            </Portal>
        </div>
    )
}

export default HeaderUser;