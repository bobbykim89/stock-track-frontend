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
  setAlert(context, { msg, timeout = 5000 }) {
    context.commit('setAlert', msg)
    setTimeout(() => commit('dismissAlert'), timeout)
  },
}
export const getters = {
  getAlert(state) {
    return state.alert
  },
}
