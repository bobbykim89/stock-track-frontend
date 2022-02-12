<template>
  <div class="mx-auto bg-dark text-white rounded p-4 mt-5 shadow">
    <b-form @submit.prevent="onSubmit" class="mx-auto mt-3 mb-3">
      <b-form-group id="title-group" label="Title:" label-for="title">
        <b-form-input
          id="title"
          type="text"
          v-model="todo.title"
          placeholder="Please write your todo here"
          required
        >
        </b-form-input>
      </b-form-group>
      <b-form-group id="content-group" label="Content:" label-for="content">
        <b-form-textarea
          id="content"
          v-model="todo.content"
          rows="6"
          placeholder="Write Details here"
        >
        </b-form-textarea>
      </b-form-group>
      <b-form-group class="d-flex justify-content-center">
        <b-form-radio-group v-model="todo.type">
          <b-form-radio value="personal"
            ><span class="text-white-50">Personal</span></b-form-radio
          >
          <b-form-radio value="work"
            ><span class="text-success">Work</span></b-form-radio
          >
          <b-form-radio value="errand"
            ><span class="text-info">Errand</span></b-form-radio
          >
        </b-form-radio-group>
      </b-form-group>
      <b-button type="submit" class="w-100">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: {
        title: '',
        content: '',
        type: 'personal',
      },
    }
  },
  methods: {
    async onSubmit() {
      const { title, content, type } = this.todo
      await this.$store.dispatch('todoStore/createNewTodo', {
        title,
        content,
        type,
      })
      this.todo = {
        title: '',
        content: '',
        type: 'personal',
      }
    },
  },
}
</script>

<style></style>
