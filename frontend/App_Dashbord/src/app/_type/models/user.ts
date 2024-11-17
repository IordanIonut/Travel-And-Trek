import { Hastag } from "./hashtag"

export interface User {
  id: number
  user_hashtag_id: Hastag[]
  name: string
  email: string
  password: string
  bio: string
  date_create: string
  profile_picture: string
  gender: string
  date_of_birth: string
  date_last_update: string
  qr_code: string
  location: string
}