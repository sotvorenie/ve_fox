import {SearchResponse} from "../../types/search.ts";

import {apiFetch} from "../index.ts";

export const apiSearch = async (title: string, page: number): Promise<SearchResponse> => {
    return await apiFetch(`/search?value=${title}&page=${page}`)
}