export const replaceSymbols = (name: string) => {
    return name.replaceAll(" ! ", " | ")
        .replaceAll(" !! ", " || ")
        .replaceAll("№", "#")
}