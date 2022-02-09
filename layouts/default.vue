<template>
  <div class="background">
    <Navbar />
    <div class="container-md content-area px-0">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/layout-parts/Navbar.vue'
import Footer from '@/components/layout-parts/Footer.vue'
export default {
  components: {
    Navbar,
    Footer,
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Permanent+Marker&display=swap');

.font-set {
  font-family: 'inter', sans-serif;
}

.background {
  background-color: rgb(30 41 59);
}

.content-area {
  min-height: 80vh;
}
</style>
