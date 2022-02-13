<template>
  <div class="bg-dark rounded shadow p-4 my-4">
    <b-input-group>
      <b-input-group-prepend>
        <b-button @click="clickSearch">
          <i class="fa-solid fa-magnifying-glass"></i>
        </b-button>
      </b-input-group-prepend>
      <b-form-input
        type="text"
        id="searchFilter"
        v-model="query"
        @keyup="$emit('filter', query)"
        placeholder="Press enter keywords."
      ></b-form-input>
      <b-input-group-append>
        <b-button @click="clearSearch"> Clear </b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
    }
  },
  methods: {
    clearSearch() {
      this.$nuxt.refresh()
      this.query = ''
      this.$emit('filter', '')
    },
    clickSearch() {
      document.getElementById('searchFilter').focus()
    },
  },
  computed: {
    getFiltered() {
      const getFiltered = this.$store.getters['todoStore/getFiltered']
      if (getFiltered === nill) {
        this.query = ''
      }
      if (this.query !== '') {
        this.$store.dispatch('todoStore/filterTodo', query)
      } else {
        this.$store.dispatch('todoStore/clearFilter')
      }
    },
  },
}
</script>

<style></style>
