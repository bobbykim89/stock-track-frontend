import gql from 'graphql-tag'

const createPost = gql`
  mutation CREATE_POST($code: String!, $name: String!) {
    CREATE_POST(code: $code, name: $name) {
      code
      name
      author {
        username
        id
        email
      }
      id
      date
    }
  }
`

const deletePost = gql`
  mutation DELETE_POST($id: ID!) {
    DELETE_POST(id: $id) {
      code
      name
      id
      author {
        id
        username
        email
      }
      date
    }
  }
`

export { createPost, deletePost }
