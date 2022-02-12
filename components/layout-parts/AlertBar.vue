<template>
  <div v-if="checkAlert">
    <b-alert :variant="checkAlert.type" class="mx-2 text-center mt-4" show>
      <i class="fa-solid fa-circle-info"></i> {{ checkAlert.msg }}
    </b-alert>
  </div>
</template>

<script>
export default {
  computed: {
    checkAlert() {
      return this.$store.getters['alertStore/getAlert']
    },
  },
}
</script>

<style></style>
