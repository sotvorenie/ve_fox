import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
import { useShallow } from 'zustand/react/shallow';

import SearchIcon from "../../../assets/images/icons/SearchIcon.tsx";
import CrossIcon from "../../../assets/images/icons/CrossIcon.tsx";

import {useSearchStore} from "../../../store/useSearchStore.ts";

function HeaderSearch() {
    const navigate = useNavigate();

    const {value, setValue, search} = useSearchStore(useShallow((state) => ({ ...state })))

    const inputRef = useRef<HTMLInputElement>(null)


    const handleSearchText = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value)
    }

    const clearSearchName = (): void => {
        setValue('')
    }

    const handleSearch = async () => {
        if (value) {
            navigate("/search")
            await search()
        }
    }

    return (
        <div className="header__search flex overflow-hidden position-relative">
            <input className="header__input input"
                   ref={inputRef}
                   onChange={handleSearchText}
                   onKeyDown={async (e) => {
                       if (e.key === "Enter") await handleSearch()
                   }}
                   value={value}
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
            {value && (
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