import gql from 'graphql-tag'

const signUp = gql`
  mutation SIGNUP_USER(
    $email: String!
    $username: String!
    $password: String!
  ) {
    SIGNUP_USER(email: $email, username: $username, password: $password) {
      email
      password
      username
      token
      id
    }
  }
`

const login = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    LOGIN_USER(email: $email, password: $password) {
      email
      password
      username
      token
      id
    }
  }
`

export { signUp, login }
