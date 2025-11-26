export const replaceLines = (name: string) => {
    return name.replaceAll(" ! ", " | ").replaceAll(" !! ", " || ");
}

export const sliceString = (name: string = '', value: number = 20) => {
    return name?.length <= value ? name : `${name.slice(0, value)}...`
}