import {Menu} from "../../types/main/menu.ts";

import Home from "../../assets/images/icons/main/menu/Home.vue";
import Like from "../../assets/images/icons/main/menu/Like.vue";
import Later from "../../assets/images/icons/main/menu/Later.vue";
import History from "../../assets/images/icons/main/menu/History.vue";

const menuItems: Menu[] = [
    {
        title: 'Главная',
        icon: Home,
    },
    {
        title: 'История',
        icon: History,
    },
    {
        title: 'Понравившиеся',
        icon: Like,
    },
    {
        title: 'Смотреть позже',
        icon: Later,
    },
]

export default menuItems