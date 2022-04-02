import axios from 'axios'

export const state = () => ({
  user: null,
})

/**
 * Mutate state directly
 *
 * @example e.g. inside an action
 *              `commit('LOGOUT')`
 */
export const mutations = {
  SET_USER_DATA(state, userData) {
    localStorage.setItem('user', JSON.stringify(userData))
    axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
    state.user = userData
  },
  LOGOUT(state) {
    return new Promise((resolve, reject) => {
      try {
        this.$auth.logout('local')
        localStorage.removeItem('user')
        state.user = null
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
}

/**
 * Functions that call mutations
 *
 * @example e.g. inside a vue SFC method
 *          `this.$store.dispatch('register', {...})`
 */
export const actions = {
  async register({ commit }, credentials) {
    const { data } = await axios.post(
      `${process.env.authUrl}/register`,
      credentials
    )
    commit('SET_USER_DATA', data)
  },

  async login({ commit }, credentials) {
    const { data } = await axios.post(
      `${process.env.authUrl}/login`,
      credentials
    )
    commit('SET_USER_DATA', data)
  },

  logout({ commit }) {
    commit('LOGOUT')
  },
}

/**
 * Compute derived state based on store state
 *
 * @quote
 *   "equivalent to Vue's computed properties in that they
 *    both are reactive to changes in dependencies and
 *    cached for improved performance." - Drew Town
 *
 * @url https://cutt.ly/NSjRu9v
 *
 * @example e.g. inside computed property with vuex helper
 *          `computed: {
 *            ...mapGetters('doneTodos')
 *          }``
 * ```
 */
export const getters = {
  doneTodos(state) {
    return state.user.filter((todo) => todo.done)
  },
  sortedTodos: (state) => {
    // remember sort mutates the original array so, copy it first with a spread.
    return [...state.todos].sort((a, b) => a.dueDate.localeCompare(b.dueDate))
  },
}
