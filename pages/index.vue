<template>
  <div class="h-100 mb-5">
    <div class="bg-dark rounded shadow p-4 px-md-5 my-4 mx-2">
      <b-input-group>
        <b-input-group-prepend>
          <b-button @click="clickSearch">
            <i class="fa-solid fa-magnifying-glass"></i>
          </b-button>
        </b-input-group-prepend>
        <b-form-input
          type="text"
          id="search"
          v-model.lazy="query"
          @keyup.enter="$fetch"
          placeholder="Press enter afterwards."
        ></b-form-input>
        <b-input-group-append>
          <b-button @click="clearSearch"> Clear </b-button>
        </b-input-group-append>
      </b-input-group>
    </div>

    <div v-if="stockDetail && query !== ''">
      <b-card-group>
        <StockCard
          v-for="stock in stockDetail"
          :key="stock.symbol"
          class="col-md-4 col-lg-3"
          :stockInfo="stock"
          @clearSearch="clearSearch"
        />
      </b-card-group>
    </div>
    <div v-if="query === ''">
      <b-card-group>
        <FavoritesCard
          v-for="favorite in getPosts"
          :key="favorite.id"
          :favorite="favorite"
          class="col-md-4 col-lg-3"
        />
      </b-card-group>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import StockCard from '@/components/main-parts/StockCard.vue'
import FavoritesCard from '@/components/main-parts/FavoritesCard.vue'
const ALPHA_API_KEY = process.env.ALPHA_API_KEY
export default {
  name: 'IndexPage',
  components: {
    StockCard,
    FavoritesCard,
  },
  data() {
    return {
      stockDetail: [],
      query: '',
    }
  },
  middleware: 'checkAuth',
  async fetch() {
    if (this.query !== '') {
      await this.getAlphaInfo()
    }
  },
  // async asyncData({ app }) {
  //   const client = app.apolloProvider.defaultClient
  //   const res = await client.query({
  //     query: getAllPosts,
  //   })
  //   const { GET_ALL_POSTS } = res.data
  //   return { posts: { ...GET_ALL_POSTS } }
  // },
  methods: {
    async getAlphaInfo() {
      // Get stock info from Alphabase
      let alphaList = []
      const alphaInfo = await axios.get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.query}&apikey=${ALPHA_API_KEY}`
      )
      alphaInfo.data.bestMatches.forEach((res) => {
        alphaList.push({
          symbol: res['1. symbol'],
          name: res['2. name'],
        })
      })
      this.stockDetail = alphaList
    },
    clearSearch() {
      this.$nuxt.refresh()
      this.query = ''
    },
    clickSearch() {
      document.getElementById('search').focus()
    },
  },
  computed: {
    getPosts() {
      const posts = this.$store.getters['postStore/getPosts']
      return posts
    },
  },
}
</script>
