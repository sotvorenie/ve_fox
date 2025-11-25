import React, {useRef} from "react";

import {useSearch} from "../../../hooks/useSearch.ts";

import CrossIcon from "../../../assets/images/icons/CrossIcon.tsx";
import SearchIcon from "../../../assets/images/icons/SearchIcon.tsx";

import avatarImage from "../../../assets/images/аватар.webp";

function MainHeader() {
    const {searchName, setSearchName, clearSearchName} = useSearch();

    const inputRef = useRef<HTMLInputElement>(null)


    const handleSearchText = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchName(event.target.value)
    }

    return(
        <header className="header flex flex-align-center flex-justify-center">
            <div className="header__search flex overflow-hidden position-relative">
                <input className="header__input input"
                       ref={inputRef}
                       value={searchName}
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
                {searchName && (
                    <button
                        className="header__clear recolor-svg position-absolute button-width-svg flex-center hover-color-accent"
                        type="button"
                        aria-label="Очистить"
                        title="Очистить"
                        onClick={clearSearchName}
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