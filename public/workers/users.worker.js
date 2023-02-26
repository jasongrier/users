let db
let transactionsCompleted = 0

const req = indexedDB.open('codenotary-assignment')

req.onupgradeneeded = () => {
  req.result.createObjectStore('users', { keyPath: 'id' })
}

req.onsuccess = evt => {
  db = evt.target.result
}

const fetchUsers = async () => {
  try {
    const usersRes = await fetch('/data/users.json')
    const users = await usersRes.json()
    const transaction = db.transaction('users', 'readwrite')
    const store = transaction.objectStore('users')

    store.clear()

    users.forEach((user, id) => {
      const req = store.add({ ...user, id })

      req.onsuccess = function () {
        transactionsCompleted++

        if (transactionsCompleted === users.length) {
          postMessage('OK')
        }
      }

      req.onerror = () => {
        postMessage(req.error)
      }
    })
  } catch (err) {
    postMessage(err)
  }
}

fetchUsers()
