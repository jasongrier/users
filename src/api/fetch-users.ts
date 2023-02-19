import axios from 'axios'
import { v4 as uuid } from 'uuid'

export const fetchUsers = async () => {
  try {
    return (await axios.get('/users.json')).data.map((rawUser: any) => ({
      ...rawUser,
      id: uuid(),
    }))
  } catch (err) {
    console.error(err)
    return []
  }
}
