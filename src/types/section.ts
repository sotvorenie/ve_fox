export interface Section {
    id: number
    name: string
    channelId: number
}

export interface SectionResponse {
    sections: Section[]
    total: number
}