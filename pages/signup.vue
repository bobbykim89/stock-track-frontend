<template>
  <div class="content-area text-white py-5">
    <div class="mx-auto col-11 col-md-5 bg-dark rounded p-4 shadow">
      <h1 class="text-center">SignUp</h1>

      <b-form @submit.prevent="onSubmit" class="mx-auto mx-md-4 mb-3">
        <b-form-group
          id="username-group"
          label="Username:"
          label-for="username"
        >
          <b-form-input
            id="username"
            type="text"
            placeholder="Your Username"
            v-model="userInfo.username"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group id="email-group" label="Email:" label-for="email">
          <b-form-input
            id="email"
            type="email"
            placeholder="example@mail.com"
            v-model="userInfo.email"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="password-group"
          label="Password:"
          label-for="password"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="userInfo.password"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="password-group-2"
          label="Confirm Password:"
          label-for="password2"
        >
          <b-form-input
            id="password2"
            type="password"
            v-model="userInfo.password2"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-button type="submit" class="w-100 mt-2">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        username: '',
        email: '',
        password: '',
        password2: '',
      },
    }
  },
  methods: {
    async onSubmit() {
      const { username, email, password, password2 } = this.userInfo
      if (email === '' || password === '') {
        console.log('please fill all fields.')
        return
      } else if (password !== password2) {
        console.log("Passwords don't match!")
        return
      } else {
        try {
          await this.$store.dispatch('authStore/signUp', {
            username,
            email,
            password,
          })
          this.userInfo = {
            username: '',
            email: '',
            password: '',
            password2: '',
          }
          await this.$router.push('/')
        } catch (err) {
          console.log(err)
        }
      }
    },
  },
}
</script>

<style scoped>
.content-area {
  min-height: 80vh;
}
</style>
