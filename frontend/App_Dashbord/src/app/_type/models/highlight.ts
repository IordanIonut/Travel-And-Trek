import { Media } from "./media"

export interface Highlight{
    id: number
    highlight_medias: Media[],
    name: string
    image: string
    visibility: boolean
    created_at: string
    updated_at: string
}