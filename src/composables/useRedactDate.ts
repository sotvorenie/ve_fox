export const redactDate = (date: string) => {
    const oldDate = new Date(date);
    const nowDate = new Date()

    const diffMs = nowDate.getTime() - oldDate.getTime();

    const sec = Math.floor(diffMs / 1000);
    const min = Math.floor(sec / 60);
    const hours = Math.floor(min / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (sec < 10) return "только что";
    if (min < 1) return `${sec} сек назад`;
    if (hours < 1) return `${min} мин назад`;
    if (days < 1) return `${hours} ч назад`;
    if (days < 30) return `${days} дн назад`;
    if (days < 365) return `${months} мес назад`;
    return `${years} г назад`;
}