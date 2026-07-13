import React from "react";
import {useLocation} from "react-router-dom";

import {apiSetWatchLater} from "@api/watch_later/watchLater.ts";

import EllipsisIcon from "@icons/EllipsisIcon.tsx";

interface Props {
    id: number
    isOpenMenu: boolean
    setIsOpenMenu: (isVisible: any) => void
    isSmall?: boolean
}

function VideoMenu({id, isOpenMenu = false, setIsOpenMenu, isSmall = false}: Readonly<Props>) {
    const location = useLocation()

    const handleMenuOpen = (event: React.MouseEvent): void => {
        event.stopPropagation()
        event.preventDefault()
        setIsOpenMenu((prev: boolean) => !prev)
    }

    const buttons = [
        {
            title: 'Смотреть позже',
            func: () => apiSetWatchLater(id).then(),
        },
    ]

    const titleText = isOpenMenu ? 'Закрыть меню' : 'Действия с видео'

    return (
        <div className={`video-menu ${isOpenMenu ? 'is-active' : ''} ${isSmall ? 'is-small' : ''}`}>
            {location.pathname !== '/watch_later' && (
                <button
                    className="video-menu__open recolor-svg button-width-svg flex-center radius-50 position-absolute"
                    type="button"
                    onClick={handleMenuOpen}
                    title={titleText}
                >
                    <EllipsisIcon/>
                </button>
            )}

            <div className="video-menu__content position-absolute text-nowrap">
                {buttons?.map(button => (
                    <button key={button.title}
                            className="hover-color-accent"
                            type="button"
                            onClick={button.func}
                    >
                        {button.title}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default VideoMenu;