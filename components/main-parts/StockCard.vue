<template>
  <div class="mb-3 px-2">
    <b-card
      :header="
        stockInfo.name.length < 22
          ? stockInfo.name
          : stockInfo.name.substring(0, 22) + '...'
      "
      :title="stockInfo.symbol"
      bg-variant="light"
      class="h-100 shadow"
    >
      <b-button @click="handleClick" class="w-100">Add</b-button>
    </b-card>
  </div>
</template>

<script>
import { createPost } from '@/graphql/mutations/post'
export default {
  props: {
    stockInfo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async handleClick() {
      const { name, symbol } = this.stockInfo
      const res = await this.$apollo.mutate({
        mutation: createPost,
        variables: {
          name,
          code: symbol,
        },
      })
      const { CREATE_POST } = res.data
      console.log(CREATE_POST)
      this.$emit('clearSearch')
    },
  },
}
</script>

<style scoped></style>
