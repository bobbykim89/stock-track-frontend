<template>
  <div class="screen-height mb-5">
    <div class="bg-dark rounded shadow p-4 px-md-5 my-4 mx-3">
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

    <div v-if="stockDetail && query !== ''" class="container">
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4">
        <div
          class="col mb-3 mb-lg-4"
          v-for="stock in stockDetail"
          :key="stock.symbol"
        >
          <StockCard
            :stockInfo="stock"
            @clearSearch="clearSearch"
            class="h-100"
          />
        </div>
      </div>
    </div>
    <div v-if="query === ''" class="container">
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4">
        <div
          class="col mb-3 mb-lg-4"
          v-for="favorite in getPosts"
          :key="favorite.id"
        >
          <FavoritesCard :favorite="favorite" class="h-100" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import StockCard from '@/components/main-parts/StockCard.vue'
import FavoritesCard from '@/components/main-parts/FavoritesCard.vue'
const ALPHA_API_KEY = process.env.ALPHA_API_KEY
export default {
  name: 'Home',
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
    async onPageLoad() {
      await this.$store.dispatch('postStore/getPosts')
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
  async mounted() {
    await this.onPageLoad()
  },
}
</script>

<style>
.screen-height {
  min-height: 80vh;
}
</style>
