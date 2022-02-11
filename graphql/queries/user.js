import gql from 'graphql-tag'

const getCurrentUser = gql`
  query GET_CURRENT_USER {
    GET_CURRENT_USER {
      email
      password
      username
      token
    }
  }
`

export { getCurrentUser }
