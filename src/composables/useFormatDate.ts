import {months} from "../data/months.ts";

export const useFormatDate = (str: string) => {
    const date = new Date(str);

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}г.`
}