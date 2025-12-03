import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";

import SearchIcon from "../../../assets/images/icons/SearchIcon.tsx";
import CrossIcon from "../../../assets/images/icons/CrossIcon.tsx";

import {useSearch} from "../../../hooks/useSearch.ts";

function HeaderSearch() {
    const navigate = useNavigate();

    const {
        search,
        setSearch,
        getSearchVideos
    } = useSearch();

    const inputRef = useRef<HTMLInputElement>(null)


    const handleSearchText = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value)
    }

    const clearSearchName = (): void => {
        setSearch('')
    }

    const handleSearch = async () => {
        if (search) {
            navigate("/search")
            await getSearchVideos()
        }
    }

    return (
        <div className="header__search flex overflow-hidden position-relative">
            <input className="header__input input"
                   ref={inputRef}
                   onChange={handleSearchText}
                   value={search}
                   type="text"
                   placeholder="Введите запрос"
            />

            <button className="header__btn flex-center recolor-svg"
                      type="button"
                      aria-label="Поиск"
                      title="Поиск"
                      onClick={handleSearch}
            >
                <SearchIcon/>
            </button>
            {search && (
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
    )
}

export default HeaderSearch;