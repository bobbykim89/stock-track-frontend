<template>
  <b-navbar-nav class="ml-md-auto">
    <b-nav-item class="username mx-auto mx-md-0 text-capitalize"
      >Welcome {{ getUser.username }}!</b-nav-item
    >
    <b-nav-item @click="onLogout" class="mx-auto mx-md-0">Logout</b-nav-item>
  </b-navbar-nav>
</template>

<script>
export default {
  methods: {
    async onLogout() {
      await this.$store.dispatch('authStore/logout')
      await this.$router.push('/login')
    },
  },
  computed: {
    getUser() {
      return this.$store.getters['authStore/getUser']
    },
  },
}
</script>

<style scoped>
.username a:hover {
  cursor: default !important;
  color: #9a9d9f !important;
}
</style>
