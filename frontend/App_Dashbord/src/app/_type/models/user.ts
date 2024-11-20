import { GenderEnum } from "../enum/gender.enum"
import { Hastag } from "./hashtag"

export interface User {
  id: number
  user_hashtag_id: Hastag[]
  name: string
  email: string
  password: string
  bio: string
  date_create: Date
  profile_picture: string
  gender: GenderEnum
  date_of_birth: Date
  date_last_update: Date
  qr_code: string
  location: string
}