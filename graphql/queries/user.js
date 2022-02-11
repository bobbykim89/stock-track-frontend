import gql from 'graphql-tag'

const getCurrentUser = gql`
  query GET_CURRENT_USER {
    GET_CURRENT_USER {
      email
      username
      token
    }
  }
`

export { getCurrentUser }
