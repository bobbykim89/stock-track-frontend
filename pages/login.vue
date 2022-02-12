<template>
  <div class="content-area text-white py-5">
    <div class="mx-auto col-11 col-md-5 bg-dark rounded p-4 shadow">
      <h1 class="text-center">Login</h1>

      <b-form @submit.prevent="onSubmit" class="mx-auto mx-md-4 mb-3">
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
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async onSubmit() {
      const { email, password } = this.userInfo
      if (email === '' || password === '') {
        console.log('please fill all fields')
        return
      } else {
        try {
          await this.$store.dispatch('authStore/login', {
            email: email,
            password: password,
          })

          this.userInfo = { email: '', password: '' }
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
