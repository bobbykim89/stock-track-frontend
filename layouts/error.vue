<template>
  <section class="text-light mt-5">
    <div class="d-flex flex-column justify-content-center text-center">
      <img src="~assets/images/logo.png" alt="logo" class="mx-auto mb-4" />
      <h1>Woops!</h1>
      <h3 class="mb-5">This page does not exist!</h3>
      <b-button class="button">
        <a href="/">Go Back</a>
      </b-button>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

section {
  font-family: 'Permanent Marker', cursive;
}
a {
  color: #fff;
}
a:hover {
  color: #fff;
  text-decoration: none;
}
img {
  width: 15rem;
}
.button {
  width: 6rem;
  margin: 0 auto;
}
</style>
