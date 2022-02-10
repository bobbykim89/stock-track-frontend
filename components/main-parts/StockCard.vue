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
export default {
  props: {
    stockInfo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleClick() {
      console.log('clicked!')
    },
  },
}
</script>

<style scoped></style>
