import { Hastag } from "./hashtag"
import { Media } from "./media"
import { User } from "./user"

export interface Post{
    id: PostId
    post_user_id: User
    post_medias_id: Media[]
    post_hashtag_id: Hastag[]
    tagged_users: User[]
    description: string
    visible: boolean
    create_at: string
    update_at: string
}

export interface PostId{
    id: number
    type: string
}