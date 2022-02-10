<template>
  <div class="h-100">
    <div class="bg-dark rounded shadow p-4 px-md-5 my-4 mx-2">
      <b-input-group>
        <b-input-group-prepend>
          <b-button>
            <i class="fa-solid fa-magnifying-glass"></i>
          </b-button>
        </b-input-group-prepend>
        <b-form-input
          type="text"
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
          class="col-md-3"
          :stockInfo="stock"
        />
      </b-card-group>
    </div>
    <div v-if="query === ''">
      <b-card-group>
        <FavoritesCard
          v-for="favorite in favorites"
          :key="favorite.symbol"
          :favorite="favorite"
          class="col-md-3"
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
      favorites: [
        {
          name: 'Advanced Micro Devices',
          symbol: 'AMD',
        },
        {
          name: 'Intel Corp',
          symbol: 'INTC',
        },
        {
          name: 'Tesla Inc',
          symbol: 'TSLA',
        },
      ],
    }
  },
  async fetch() {
    // await this.getStockInfo()
    if (this.query !== '') {
      await this.getAlphaInfo()
    }
    // await this.getLiveInfo(this.stockDetail[0].symbol)
  },
  methods: {
    async getStockInfo() {
      // Get stock info from finnhub (not accurate)
      const stockInfo = await axios.get(
        `https://finnhub.io/api/v1/search?q=${this.query}&token=${API_KEY}`
      )
      const infoResult = stockInfo.data.result
      const infoCommonStock = await infoResult.filter((info) => {
        return info.type === 'Common Stock' && !info.symbol.includes('.')
      })
      console.log(infoCommonStock)
      this.stockDetail = infoCommonStock
    },
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
      console.log(alphaList)
      this.stockDetail = alphaList
    },
    clearSearch() {
      this.query = ''
    },
  },
}
</script>
