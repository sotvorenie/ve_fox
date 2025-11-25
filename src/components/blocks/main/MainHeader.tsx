import React, {useRef, useState} from "react";

import CrossIcon from "../../../assets/images/icons/CrossIcon.tsx";
import SearchIcon from "../../../assets/images/icons/SearchIcon.tsx";

import avatarImage from "../../../assets/images/аватар.webp";

function MainHeader() {
    const [searchText, setSearchText] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)


    const handleSearchText = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchText(event.target.value)
    }

    const clearSearchText = (): void => {
        setSearchText('')
        inputRef.current?.focus()
    }

    return(
        <header className="header flex flex-align-center flex-justify-center">
            <div className="header__search flex overflow-hidden position-relative">
                <input className="header__input input"
                       ref={inputRef}
                       value={searchText}
                       onChange={handleSearchText}
                       type="text"
                       placeholder="Введите запрос"
                />

                <button className="header__btn flex-center recolor-svg"
                        type="button"
                        aria-label="Поиск"
                        title="Поиск"
                >
                    <SearchIcon/>
                </button>
                {searchText && (
                    <button
                        className="header__clear recolor-svg position-absolute button-width-svg flex-center hover-color-accent"
                        type="button"
                        aria-label="Очистить"
                        title="Очистить"
                        onClick={clearSearchText}
                    >
                        <CrossIcon/>
                    </button>
                )}
            </div>

            <div className="header__avatar img-container position-absolute cursor-pointer"
                 title="user"
            >
                <img src={avatarImage} alt="user"/>
            </div>
        </header>
    )
}

export default MainHeader;