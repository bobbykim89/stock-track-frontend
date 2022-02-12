export const state = () => ({
  alert: null,
})
export const mutations = {
  setAlert(state, payload) {
    state.alert = payload
  },
  dismissAlert(state) {
    state.alert = null
  },
}
export const actions = {
  setAlert(context, { msg, type, timeout = 3000 }) {
    context.commit('setAlert', { msg, type })
    setTimeout(() => context.commit('dismissAlert'), timeout)
  },
}
export const getters = {
  getAlert(state) {
    return state.alert
  },
}
