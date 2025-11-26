import React, {useRef} from "react";
import {Link} from "react-router-dom";

import {useSearch} from "../../../hooks/useSearch.ts";

import ArrowIcon from "../../../assets/images/icons/ArrowIcon.tsx";

import CrossIcon from "../../../assets/images/icons/CrossIcon.tsx";
import SearchIcon from "../../../assets/images/icons/SearchIcon.tsx";

import avatarImage from "../../../assets/images/аватар.webp";


interface Props {
    backVisible?: boolean
}

function MainHeader({backVisible = false}: Props) {
    const {searchName, setSearchName, clearSearchName} = useSearch();

    const inputRef = useRef<HTMLInputElement>(null)


    const handleSearchText = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchName(event.target.value)
    }

    return(
        <header className="header flex flex-align-center flex-justify-center position-sticky">
            {backVisible &&
                <Link to="/"
                      className="header__back position-absolute flex flex-align-center recolor-svg"
                >
                    <ArrowIcon/>
                    <span className="h5">Назад</span>
                </Link>}

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
                        className="header__clear recolor-svg button-width-svg flex-center hover-color-accent"
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