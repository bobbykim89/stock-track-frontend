import { getUserPosts } from '@/graphql/queries/post'
import { createPost, deletePost } from '@/graphql/mutations/post'

export const state = () => ({
  posts: [],
})
export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
  addPost(state, payload) {
    state.posts = [...state.posts, payload]
  },
  removePost(state, payload) {
    state.posts = state.posts.filter((post) => {
      return post.id !== payload
    })
  },
}
export const actions = {
  async getPosts(context) {
    try {
      const client = this.app.apolloProvider.defaultClient
      const res = await client.query({
        query: getUserPosts,
      })
      const { GET_USER_POSTS } = res.data

      context.commit('setPosts', GET_USER_POSTS)
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
  async createNewPost(context, { name, code }) {
    try {
      const checkUnique = context.state.posts.filter((post) => {
        return post.code === code
      })
      if (checkUnique.length) {
        await context.dispatch(
          'alertStore/setAlert',
          {
            msg: `${name} already in your list`,
            type: 'danger',
          },
          { root: true }
        )
        return
      }
      const client = this.app.apolloProvider.defaultClient
      const res = await client.mutate({
        mutation: createPost,
        variables: {
          name,
          code,
        },
      })
      const { CREATE_POST } = res.data
      await context.dispatch(
        'alertStore/setAlert',
        {
          msg: `Added ${CREATE_POST.name} to your favorites list!`,
          type: 'success',
        },
        { root: true }
      )
      context.commit('addPost', CREATE_POST)
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
  async deletePost(context, { id }) {
    try {
      const client = this.app.apolloProvider.defaultClient
      const res = await client.mutate({
        mutation: deletePost,
        variables: {
          id,
        },
      })
      const { DELETE_POST } = res.data
      await context.dispatch(
        'alertStore/setAlert',
        {
          msg: `Removed ${DELETE_POST.name} from your favorites list!`,
          type: 'success',
        },
        { root: true }
      )
      context.commit('removePost', id)
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
  getPosts(state) {
    return state.posts
  },
}
