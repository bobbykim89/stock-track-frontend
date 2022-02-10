<template>
  <div class="bg-warning h-100">
    <h1>Type Stock you want to search</h1>
    <input type="text" v-model.lazy="query" @keyup.enter="$fetch" />
    <div v-if="query !== ''">
      <div v-for="stock in stockDetail" :key="stock.symbol">
        <p>{{ stock.symbol }}</p>
        <p>{{ stock.description }}</p>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import axios from 'axios'
const API_KEY = process.env.API_KEY
export default {
  name: 'IndexPage',
  data() {
    return {
      stockDetail: [],
      stockPrice: {},
      query: '',
    }
  },
  async fetch() {
    await this.getStockInfo()
    // await this.getLiveInfo(this.stockDetail[0].symbol)
  },
  methods: {
    async getStockInfo() {
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
    async getLiveInfo(name) {
      const stockInfo = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${name}&token=${API_KEY}`
      )
      const { c, d, h, l } = stockInfo.data
      this.stockPrice = { current: c, change: d, high: h, low: l }
      console.log(this.stockPrice)
    },
  },
}
</script>
