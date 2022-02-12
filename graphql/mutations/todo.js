import gql from 'graphql-tag'

const createTodo = gql`
  mutation CREATE_TODO($title: String!, $content: String, $type: String!) {
    CREATE_TODO(title: $title, content: $content, type: $type) {
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

const editTodo = gql`
  mutation EDIT_TODO(
    $id: ID!
    $title: String!
    $content: String
    $complete: Boolean!
    $type: String!
  ) {
    EDIT_TODO(
      id: $id
      title: $title
      content: $content
      complete: $complete
      type: $type
    ) {
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

const toggleComplete = gql`
  mutation TOGGLE_COMPLETE($id: ID!, $complete: Boolean!) {
    TOGGLE_COMPLETE(id: $id, complete: $complete) {
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

const deleteTodo = gql`
  mutation DELETE_TODO($id: ID!) {
    DELETE_TODO(id: $id) {
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

export { createTodo, editTodo, toggleComplete, deleteTodo }
