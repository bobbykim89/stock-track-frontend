import { getUserTodo } from '@/graphql/queries/todo'
import {
  createTodo,
  editTodo,
  toggleComplete,
  deleteTodo,
} from '@/graphql/mutations/todo'

export const state = () => ({
  todos: [],
})
export const mutations = {
  setTodos(state, payload) {
    state.todos = payload
  },
  addTodo(state, payload) {
    state.todos = [...state.todos, payload]
  },
  editTodo(state, payload) {
    state.todos = state.todos.map((todo) =>
      todo.id === payload.id ? payload : todo
    )
  },
  removeTodo(state, payload) {
    state.todos = state.todos.filter((todo) => {
      return todo.id !== payload
    })
  },
}
export const actions = {
  async getTodos(context) {
    try {
      const client = this.app.apolloProvider.defaultClient
      const res = await client.query({
        query: getUserTodo,
      })
      const { GET_USER_TODOS } = res.data

      context.commit('setTodos', GET_USER_TODOS)
    } catch (err) {
      console.log(err)
    }
  },
  async createNewTodo(context, { title, content, type }) {
    try {
      const client = this.app.apolloProvider.defaultClient
      const res = await client.mutate({
        mutation: createTodo,
        variables: {
          title,
          content,
          type,
        },
      })
      const { CREATE_TODO } = res.data
      await context.dispatch(
        'alertStore/setAlert',
        {
          msg: `Added ${CREATE_TODO.title} to your Todo list!`,
          type: 'success',
        },
        { root: true }
      )
      context.commit('addTodo', CREATE_TODO)
    } catch (err) {
      await context.dispatch(
        'alertStore/setAlert',
        {
          msg: `${err}`,
          type: 'danger',
        },
        { root: true }
      )
    }
  },
  async editTodo(context, { id, title, content, complete, type }) {
    try {
      const client = this.app.apolloProvider.defaultClient
      const res = await client.mutate({
        mutation: editTodo,
        variables: {
          id,
          title,
          content,
          complete,
          type,
        },
      })
      console.log(res)
      const { EDIT_TODO } = res.data
      await context.dispatch(
        'alertStore/setAlert',
        {
          msg: `Added ${EDIT_TODO.title} to your Todo list!`,
          type: 'success',
        },
        { root: true }
      )
      context.commit('editTodo', EDIT_TODO)
    } catch (err) {
      await context.dispatch(
        'alertStore/setAlert',
        {
          msg: `${err}`,
          type: 'danger',
        },
        { root: true }
      )
    }
  },
  async toggleComplete(context, { id, complete }) {
    try {
      const client = this.app.apolloProvider.defaultClient
      const res = await client.mutate({
        mutation: toggleComplete,
        variables: {
          id,
          complete,
        },
      })
      const { TOGGLE_COMPLETE } = res.data
      await context.dispatch(
        'alertStore/setAlert',
        {
          msg: `Added ${TOGGLE_COMPLETE.title} to your Todo list!`,
          type: 'success',
        },
        { root: true }
      )
      context.commit('editTodo', TOGGLE_COMPLETE)
    } catch (err) {
      console.log(err)
      await context.dispatch(
        'alertStore/setAlert',
        {
          msg: `${err}`,
          type: 'danger',
        },
        { root: true }
      )
    }
  },
  async deleteTodo(context, { id }) {
    try {
      const client = this.app.apolloProvider.defaultClient
      const res = await client.mutate({
        mutation: deleteTodo,
        variables: {
          id,
        },
      })
      const { DELETE_TODO } = res.data
      await context.dispatch(
        'alertStore/setAlert',
        {
          msg: `Removed ${DELETE_TODO.title} from your Todo list!`,
          type: 'success',
        },
        { root: true }
      )
      context.commit('removeTodo', id)
    } catch (err) {
      await context.dispatch(
        'alertStore/setAlert',
        {
          msg: `${err}`,
          type: 'danger',
        },
        { root: true }
      )
    }
  },
}
export const getters = {
  getTodos(state) {
    return state.todos
  },
}
