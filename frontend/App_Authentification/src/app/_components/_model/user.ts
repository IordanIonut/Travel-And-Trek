export interface User {
  id: string | null;
  user_hashtag_id: any;
  name: string;
  email: string;
  password: string;
  bio: string;
  date_create: Date;
  profile_picture: string;
  gender: 'M' | 'F';
  date_of_birth: Date;
  date_last_update: Date;
  qr_code: string;
  location: string;
}
