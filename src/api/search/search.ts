import {SearchResponse} from "../../types/search.ts";

import {apiGet} from "../index.ts";

export const apiSearch = (title: string, page: number): Promise<SearchResponse> => {
    return apiGet(`/search?value=${title}&page=${page}`)
}