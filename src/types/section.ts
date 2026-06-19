export interface Section {
    id: number
    name: string
    preview_url: string
}

export interface SectionResponse {
    sections: Section[]
    total: number
}