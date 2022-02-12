import jwtDecode from 'jwt-decode'

export const actions = {
  async nuxtServerInit({ dispatch }) {
    const getUser = () => {
      const token = this.$apolloHelpers.getToken()
      if (!token) {
        return
      }
      const decodedToken = jwtDecode(token)
      if (!decodedToken) {
        return
      }
      return decodedToken.user
    }
    const user = getUser()
    if (user) {
      await dispatch('authStore/setUser', {
        username: user.username,
        email: user.email,
        id: user.id,
      })
    }
  },
}
