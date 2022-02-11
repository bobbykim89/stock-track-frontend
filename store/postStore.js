import { getAllPosts } from '@/graphql/queries/post'
import { createPost, deletePost } from '@/graphql/mutations/post'

export const state = () => ({
  posts: [],
  postError: null,
})
export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
  addPost(state, payload) {
    state.posts = [...state.posts, payload]
  },
  removePost(state, payload) {
    console.log(payload)
    state.posts = state.posts.filter((post) => {
      return post.id !== payload
    })
  },
  setError(state, payload) {
    state.postError = payload
  },
}
export const actions = {
  async getPosts(context) {
    try {
      const client = this.app.apolloProvider.defaultClient
      const res = await client.query({
        query: getAllPosts,
      })
      const { GET_ALL_POSTS } = res.data

      context.commit('setPosts', GET_ALL_POSTS)
    } catch (err) {
      console.log(err)
      context.commit('setError', err)
    }
  },
  async createNewPost(context, { name, code }) {
    try {
      const client = this.app.apolloProvider.defaultClient
      const res = await client.mutate({
        mutation: createPost,
        variables: {
          name,
          code,
        },
      })
      const { CREATE_POST } = res.data
      context.commit('addPost', CREATE_POST)
    } catch (err) {
      console.log(err)
      context.commit('setError', err)
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
      context.commit('removePost', DELETE_POST)
    } catch (err) {
      console.log(err)
      context.commit('setError', err)
    }
    const client = this.app.apolloProvider.defaultClient
    const res = await client.mutate({
      mutation: deletePost,
      variables: {
        id,
      },
    })
    context.commit('removePost', id)
  },
}
export const getters = {
  getPosts(state) {
    return state.posts
  },
  getPostError(state) {
    return state.postError
  },
}
