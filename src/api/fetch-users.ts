import axios from 'axios'
import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'

export const fetchUsers = async () => {
  try {
    return (await axios.get('/data/users.json')).data.map(
      (rawUser: { [key: string]: string }) => ({
        ...rawUser,
        id: uuid(),
        registered: dayjs(rawUser.registered).format('M/D/YYYY, h:mm:ss A'),
      }),
    )
  } catch (err) {
    console.error(err)
    return []
  }
}
