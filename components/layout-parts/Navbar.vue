<template>
  <b-navbar toggleable="md" type="dark" variant="dark" class="shadow">
    <b-navbar-brand to="/" class="align-middle">
      <img
        src="~assets/images/logo.png"
        alt="logo"
        class="logo mr-2 d-inline-block mb-1"
      />
      <span class="font-weight-bolder">STOCK TRACKER</span>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" class="border-0"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-md-5">
        <b-nav-item to="/" class="mx-auto mx-md-0"> Home </b-nav-item>
        <b-nav-item to="/about" class="mx-auto mx-md-0"> About </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned auth links -->
      <NavAuthLink v-if="checkAuth" />
      <NavGuestLink v-else />
    </b-collapse>
  </b-navbar>
</template>

<script>
import NavAuthLink from '@/components/layout-parts/Nav-AuthLink.vue'
import NavGuestLink from '@/components/layout-parts/Nav-GuestLink.vue'

export default {
  components: {
    NavAuthLink,
    NavGuestLink,
  },
  computed: {
    checkAuth() {
      return this.$store.getters['authStore/getAuthentication']
    },
  },
}
</script>

<style scoped>
.logo {
  width: 1.5rem;
}
</style>
