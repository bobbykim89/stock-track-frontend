import { login, signUp } from '@/graphql/mutations/user'

export const state = () => ({
  user: null,
  isAuthenticated: false,
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setAuthentication(state, payload) {
    state.isAuthenticated = payload
  },
}

export const actions = {
  setUser(context, user) {
    context.commit('setUser', user)
    if (user) {
      context.commit('setAuthentication', true)
    }
  },
  async login(context, { email, password }) {
    try {
      const client = this.app.apolloProvider.defaultClient
      const res = await client.mutate({
        mutation: login,
        variables: {
          email,
          password,
        },
      })
      const { LOGIN_USER } = res.data

      const token = LOGIN_USER.token
      await this.$apolloHelpers.onLogin(token)
      await context.dispatch(
        'alertStore/setAlert',
        {
          msg: `Welome ${LOGIN_USER.username}`,
          type: 'success',
        },
        { root: true }
      )
      context.commit('setUser', {
        username: LOGIN_USER.username,
        email: LOGIN_USER.email,
        id: LOGIN_USER.id,
      })
      context.commit('setAuthentication', true)
    } catch (err) {
      await context.dispatch(
        'alertStore/setAlert',
        {
          msg: `${err}`,
          type: 'danger',
        },
        { root: true }
      )
      context.commit('setUser', null)
      context.commit('setAuthentication', false)
    }
  },
  async signUp(context, { username, email, password }) {
    try {
      const client = this.app.apolloProvider.defaultClient
      const res = await client.mutate({
        mutation: signUp,
        variables: {
          username,
          email,
          password,
        },
      })
      const { SIGNUP_USER } = res.data
      const token = SIGNUP_USER.token
      await this.$apolloHelpers.onLogin(token)
      await context.dispatch(
        'alertStore/setAlert',
        {
          msg: `Welome ${SIGNUP_USER.username}`,
          type: 'success',
        },
        { root: true }
      )
      context.commit('setUser', {
        username: SIGNUP_USER.username,
        email: SIGNUP_USER.email,
        id: SIGNUP_USER.id,
      })
      context.commit('setAuthentication', true)
    } catch (err) {
      await context.dispatch(
        'alertStore/setAlert',
        {
          msg: `${err}`,
          type: 'danger',
        },
        { root: true }
      )
      context.commit('setUser', null)
      context.commit('setAuthentication', false)
    }
  },
  async logout(context) {
    await this.$apolloHelpers.onLogout()
    await context.dispatch(
      'alertStore/setAlert',
      {
        msg: 'Successfully Logged Out!',
        type: 'success',
      },
      { root: true }
    )
    context.commit('setUser', null)
    context.commit('setAuthentication', false)
  },
}

export const getters = {
  getUser(state) {
    return state.user
  },
  getAuthentication(state) {
    return state.isAuthenticated
  },
}
