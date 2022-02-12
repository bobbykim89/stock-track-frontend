<template>
  <div class="bg-dark text-white shadow">
    <div class="container">
      <div class="row">
        <div class="col-md-6 py-2 py-md-5">
          <b-nav align="center" class="navbar-dark">
            <b-nav-item to="/" v-b-hover="handleHoverHome"
              ><span
                v-bind:class="[homeHovered ? 'text-white' : 'text-white-50']"
                >Home</span
              ></b-nav-item
            >
            <b-nav-item
              ><span class="text-secondary cursor">|</span></b-nav-item
            >
            <b-nav-item to="/todo" v-b-hover="handleHoverTodo"
              ><span
                v-bind:class="[todoHovered ? 'text-white' : 'text-white-50']"
                >Todo</span
              ></b-nav-item
            >
            <b-nav-item
              ><span class="text-secondary cursor">|</span></b-nav-item
            >
            <b-nav-item to="/about" v-b-hover="handleHoverAbout"
              ><span
                v-bind:class="[aboutHovered ? 'text-white' : 'text-white-50']"
                >About</span
              ></b-nav-item
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
      homeHovered: false,
      todoHovered: false,
      aboutHovered: false,
    }
  },
  methods: {
    handleHoverHome(e) {
      this.homeHovered = e
    },
    handleHoverTodo(e) {
      this.todoHovered = e
    },
    handleHoverAbout(e) {
      this.aboutHovered = e
    },
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
