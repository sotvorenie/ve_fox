export const formatVideoTime = (totalSeconds: number): string => {
    const str: string = String(totalSeconds)

    const hours: number = Math.floor(+str / 3600);
    const minutes: number = Math.floor((+str % 3600) / 60);
    const seconds: number = +str % 60;

    const hh: string = String(hours).padStart(2, '0');
    const mm: string = String(minutes).padStart(2, '0');
    const ss: string = String(seconds).padStart(2, '0');

    return hh === '00' ? `${mm}:${ss}` : `${hh}:${mm}:${ss}`
}