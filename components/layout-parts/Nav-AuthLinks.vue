<template>
  <b-navbar-nav class="ml-md-auto">
    <b-nav-item to="/login" class="mx-auto mx-md-0">{{
      getUser.username
    }}</b-nav-item>
    <b-nav-item to="/signup" class="mx-auto mx-md-0">Signup</b-nav-item>
  </b-navbar-nav>
</template>

<script>
export default {
  computed: {
    getUser() {
      return this.$store.getters['authStore/getUser']
    },
  },
}
</script>

<style></style>
