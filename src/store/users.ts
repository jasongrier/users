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
    (name.first + name.last).toLowerCase().includes(searchText),
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
      return searchText.length > 2 ? getUsersFiltered(searchText, users) : users
    },
    usersSelectedIDs({ usersSelectedIDs }: State) {
      return usersSelectedIDs
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
    toggleSelected(state: State, id: string) {
      if (state.usersSelectedIDs.includes(id)) {
        const idx = state.usersSelectedIDs.findIndex(
          selectedID => selectedID === id,
        )
        state.usersSelectedIDs.splice(idx)
      } else {
        state.usersSelectedIDs.push(id)
      }
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
    toggleSelected({ commit }: Context, id: string) {
      commit('toggleSelected', id)
    },
  },
  modules: {},
}
