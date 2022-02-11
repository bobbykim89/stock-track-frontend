import gql from 'graphql-tag'

const getAllPosts = gql`
  query GET_ALL_POSTS {
    GET_ALL_POSTS {
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

const getUserPosts = gql`
  query GET_USER_POSTS {
    GET_USER_POSTS {
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

export { getAllPosts, getUserPosts }
