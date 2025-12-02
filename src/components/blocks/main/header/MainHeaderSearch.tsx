import React, {useRef} from "react";
import {Link} from "react-router-dom";

import SearchIcon from "../../../../assets/images/icons/SearchIcon.tsx";
import CrossIcon from "../../../../assets/images/icons/CrossIcon.tsx";
import {useVideos} from "../../../../hooks/useVideos.ts";
import {useMainPages} from "../../../../hooks/useMainPages.ts";
import {useSearch} from "../../../../hooks/useSearch.ts";

function MainHeaderSearch() {
    const {getSearchVideos} = useVideos()
    const {pageList, setPageName} = useMainPages()
    const {searchTitle, setSearchTitle} = useSearch()

    const inputRef = useRef<HTMLInputElement>(null)


    const handleSearchText = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTitle(event.target.value)
    }

    const clearSearchName = (): void => {
        setSearchTitle('')
    }

    const handleSearch = async () => {
        if (searchTitle) {
            setPageName(pageList.search);
            await getSearchVideos(searchTitle)
        }
    }

    return (
        <div className="header__search flex overflow-hidden position-relative">
            <input className="header__input input"
                   ref={inputRef}
                   value={searchTitle}
                   onChange={handleSearchText}
                   type="text"
                   placeholder="Введите запрос"
            />

            <Link to="/"
                  className="header__btn flex-center recolor-svg"
                  type="button"
                  aria-label="Поиск"
                  title="Поиск"
                  onClick={handleSearch}
            >
                <SearchIcon/>
            </Link>
            {searchTitle && (
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

export default MainHeaderSearch;