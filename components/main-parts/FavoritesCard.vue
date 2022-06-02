<template>
  <b-card
    :header="favorite.code"
    bg-variant="dark"
    text-variant="white"
    class="shadow"
  >
    <b-card-body v-if="liveInfo.current !== ''" class="p-0 card-text-box">
      <h4>{{ favorite.name }}</h4>
      <hr class="border-light" />
      <p>Current Price: $ {{ liveInfo.current }}</p>
      <p v-bind:class="[changePositive ? 'text-success' : 'text-danger']">
        <span class="text-white">Change:</span> {{ liveInfo.change }}
      </p>
      <p>Daily High: $ {{ liveInfo.high }}</p>
      <p>Daily Low: $ {{ liveInfo.low }}</p>
    </b-card-body>
    <b-card-footer class="p-0">
      <div class="row no-gutters">
        <div class="col-12">
          <b-button @click="handleRemove" class="w-100">Remove</b-button>
        </div>
      </div>
    </b-card-footer>
  </b-card>
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
      interval: null,
    }
  },
  async fetch() {
    if (this.favorite) {
      await this.getLiveInfo(this.favorite.code)
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
    async handleRemove() {
      await this.$store.dispatch('postStore/deletePost', {
        id: this.favorite.id,
      })
    },
    async reNew() {
      await this.$fetch()
    },
  },
  mounted() {
    this.reNew
  },
  created() {
    this.interval = setInterval(() => {
      this.reNew()
    }, 30000)
  },
  destroyed() {
    clearInterval(this.interval)
  },
}
</script>

<style scope>
.card-text-box {
  min-height: 160px;
}
</style>
