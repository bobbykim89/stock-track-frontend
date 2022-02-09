<template>
  <div class="bg-dark text-white shadow">
    <div class="container">
      <div class="row">
        <div class="col-md-6 py-2 py-md-5">
          <b-nav align="center" class="navbar-dark">
            <b-nav-item to="/"><span class="text-white">Home</span></b-nav-item>
            <b-nav-item
              ><span class="text-secondary cursor">|</span></b-nav-item
            >
            <b-nav-item to="/about"
              ><span class="text-white">About</span></b-nav-item
            >
          </b-nav>
        </div>
        <div class="col-md-6 py-md-5">
          <div class="text-center text-md-right mt-2 pb-4 pb-md-0">
            <img
              src="~assets/images/logo.png"
              alt="logo"
              class="logo mr-2 d-inline-block mb-1"
            />
            <span class="font-weight-bolder"
              >STOCK TRACKER &copy; {{ $moment(year).format('YYYY') }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: new Date(),
    }
  },
}
</script>

<style scoped>
.cursor {
  cursor: default;
}
.logo {
  width: 1.5rem;
}
</style>
