import {url} from "../index.ts";

export const apiGetChannels = async () => {
    const response = await fetch(`${url}/channels`)

    return await response.json()
}