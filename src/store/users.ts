import { ActionContext } from 'vuex'
import { fetchUsers } from '@/api'

interface UserName {
  first: string
  last: UserName
}

interface User {
  id: string
  name: UserName
}

interface State {
  users: User[]
  searchText: string
}

type Context = ActionContext<State, object>

const filterCache: { [key: string]: User[] } = {}

const getUsersFiltered = (searchText: string, users: User[]) => {
  const collection = filterCache[searchText] ?? users

  const usersFiltered = collection.filter(({ name }) =>
    (name.first + name.last).toLowerCase().includes(searchText),
  )

  filterCache[searchText] = usersFiltered

  return usersFiltered
}

export const users = {
  namespaced: true,
  state: {
    users: [],
    searchText: '',
  } as State,
  getters: {
    users({ users }: State) {
      return users
    },
    usersFiltered({ searchText, users }: State) {
      return searchText.length > 2 ? getUsersFiltered(searchText, users) : users
    },
    searchText({ searchText }: State) {
      return searchText
    },
  },
  mutations: {
    setSearchText(state: State, searchText: string) {
      state.searchText = searchText
    },
    setUsers(state: State, users: User[]) {
      state.users = users
    },
  },
  actions: {
    async fetch({ commit }: Context) {
      try {
        commit('setUsers', await fetchUsers())
      } catch (err) {
        // dispatch error notification...
        console.log(err)
      }
    },
    search({ commit }: Context, searchText: string) {
      commit('setSearchText', searchText)
    },
  },
  modules: {},
}
