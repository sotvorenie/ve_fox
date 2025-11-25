import {Menu} from "../../types/menu.ts";

import HomeIcon from "../../assets/images/icons/HomeIcon.tsx";
import HistoryIcon from "../../assets/images/icons/HistoryIcon.tsx";
import LikeIcon from "../../assets/images/icons/LikeIcon.tsx";
import LaterIcon from "../../assets/images/icons/LaterIcon.tsx";

const menuItems: Menu[] = [
    {
        title: 'Главная',
        icon: HomeIcon,
    },
    {
        title: 'История',
        icon: HistoryIcon,
    },
    {
        title: 'Понравившиеся',
        icon: LikeIcon,
    },
    {
        title: 'Смотреть позже',
        icon: LaterIcon,
    },
]

export default menuItems