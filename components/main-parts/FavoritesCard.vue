<template>
  <div class="mb-3 px-2">
    <b-card
      :header="favorite.symbol"
      :title="favorite.name"
      bg-variant="dark"
      text-variant="white"
      class="h-100 shadow"
    >
      <b-card-text v-if="liveInfo.current !== ''">
        <hr class="border-light" />
        <p>Current Price: $ {{ liveInfo.current }}</p>
        <p v-bind:class="[changePositive ? 'text-success' : 'text-danger']">
          <span class="text-white">Change:</span> {{ liveInfo.change }}
        </p>
        <p>Daily High: $ {{ liveInfo.high }}</p>
        <p>Daily Low: $ {{ liveInfo.low }}</p>
      </b-card-text>
      <b-button @click="handleRemove" class="w-100">Remove</b-button>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'
const API_KEY = process.env.API_KEY
export default {
  props: {
    favorite: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      liveInfo: {
        current: '',
        change: '',
        high: '',
        low: '',
      },
      changePositive: null,
    }
  },
  async fetch() {
    if (this.favorite) {
      await this.getLiveInfo(this.favorite.symbol)
    }
    if (this.liveInfo.change !== '') {
      await this.handleStockColor(this.liveInfo.change)
    }
  },
  methods: {
    async getLiveInfo(name) {
      const stockInfo = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${name}&token=${API_KEY}`
      )
      const { c, d, h, l } = stockInfo.data

      this.liveInfo = { current: c, change: d, high: h, low: l }
    },
    handleStockColor(variable) {
      this.changePositive = !variable.toString().includes('-')
    },
    handleRemove() {
      console.log('Removed!')
    },
  },
}
</script>

<style></style>
