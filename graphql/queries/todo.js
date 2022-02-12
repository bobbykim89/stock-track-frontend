import gql from 'graphql-tag'

const getUserTodo = gql`
  query GET_USER_TODOS {
    GET_USER_TODOS {
      id
      title
      content
      complete
      type
      author {
        id
        username
      }
    }
  }
`

export { getUserTodo }
