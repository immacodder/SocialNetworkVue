import {firebase} from './main'

export interface userInDB {
  bio: string
  dateOfBirth: number
}
export type user = null | false | firebase.User