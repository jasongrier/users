import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'

export const fetchUsers = async () =>
  new Promise(resolve => {
    const req = indexedDB.open('codenotary-assignment')

    req.onsuccess = () => {
      const transaction = req.result.transaction('users', 'readonly')
      const store = transaction.objectStore('users')

      // TODO: Use ranges to pull a smaller initial batch from IndexedDB
      const usersReq = store.getAll()

      usersReq.onsuccess = () => {
        resolve(
          usersReq.result.map(rawUser => ({
            ...rawUser,
            id: uuid(),
            registered: dayjs(rawUser.registered).format('M/D/YYYY, h:mm:ss A'),
          })),
        )
      }
    }

    req.onerror = err => {
      console.log(err)
    }
  })
