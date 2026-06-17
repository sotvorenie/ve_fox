import {useState} from "react";

import SearchIcon from "../../../assets/images/icons/SearchIcon.tsx";

function SettingsChannels() {
    const [name, setName] = useState<string>('');

    return (
        <div className="channels">
            <div className="channels__search flex">
                <input
                    className="channels__input input__inp w-100"
                    type="text"
                    placeholder="Поиск.."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button className="channels__search-btn recolor-svg button-width-svg hover-color-accent flex-center" type="button">
                    <SearchIcon/>
                </button>
            </div>
        </div>
    )
}

export default SettingsChannels;