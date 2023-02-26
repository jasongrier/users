import { ActionContext } from 'vuex'
import { fetchUsers } from '@/api'

export interface UserName {
  first: string
  last: UserName
}

export interface User {
  id: string
  name: UserName
}

export interface State {
  searchText: string
  users: User[]
  usersSelectedIDs: string[]
}

type Context = ActionContext<State, object>

const filterCache: { [key: string]: User[] } = {}

const getUsersFiltered = (searchText: string, users: User[]) => {
  const collection = filterCache[searchText] ?? users

  const usersFiltered = collection.filter(({ name }) =>
    // TODO: Search in other fields on user as well
    `${name.first} ${name.last}`.toLowerCase().includes(searchText),
  )

  filterCache[searchText] = usersFiltered

  return usersFiltered
}

export const users = {
  namespaced: true,
  state: {
    searchText: '',
    users: [],
    usersSelectedIDs: [],
  } as State,
  getters: {
    users({ users }: State) {
      return users
    },
    usersFiltered({ searchText, users }: State) {
      return searchText.length ? getUsersFiltered(searchText, users) : users
    },
    usersSelectedIDs({ usersSelectedIDs }: State) {
      return usersSelectedIDs
    },
    searchText({ searchText }: State) {
      return searchText
    },
  },
  mutations: {
    appendUsers(state: State, users: User[]) {
      console.log('Appending users...')
      state.users = state.users.concat(users)
    },
    setSearchText(state: State, searchText: string) {
      state.searchText = searchText
    },
    toggleSelected(state: State, id: string) {
      if (state.usersSelectedIDs.includes(id)) {
        const idx = state.usersSelectedIDs.findIndex(
          selectedID => selectedID === id,
        )
        state.usersSelectedIDs.splice(idx, 1)
      } else {
        state.usersSelectedIDs.push(id)
      }
    },
  },
  actions: {
    async fetch({ commit }: Context) {
      console.log('Fetching from local DB...')

      try {
        commit('appendUsers', await fetchUsers())
      } catch (err) {
        // TODO: dispatch error notification...
        console.log(err)
      }
    },
    search({ commit }: Context, searchText: string) {
      commit('setSearchText', searchText)
    },
    toggleSelected({ commit }: Context, id: string) {
      commit('toggleSelected', id)
    },
  },
  modules: {},
}
