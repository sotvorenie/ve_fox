import {SearchResponse} from "@/types/search";

import {apiGet} from "@api/index";

export const apiSearch = (title: string, page: number): Promise<SearchResponse> => {
    return apiGet(`/search?value=${title}&page=${page}`)
}