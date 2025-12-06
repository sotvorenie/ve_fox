import {months} from "../data/months.ts";

export const useFormatDate = (str: string) => {
    if (!str) return "Неизвестно"

    const date = new Date(str);

    if (isNaN(date.getTime())) {
        return "Неизвестно";
    }

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}г.`;
};