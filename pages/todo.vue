<template>
  <div class="row mx-0">
    <div class="col-md-6">
      <InputForm />
    </div>
    <div class="col-md-6 mb-5">
      <div v-if="getTodos" class="mt-5">
        <TodoItem v-for="todo in getTodos" :key="todo.id" :todo="todo" />
      </div>
    </div>
  </div>
</template>

<script>
import InputForm from '@/components/todo-parts/InputForm.vue'
import TodoItem from '@/components/todo-parts/TodoItem.vue'
export default {
  components: {
    InputForm,
    TodoItem,
  },
  methods: {
    onPageLoad() {
      this.$store.dispatch('todoStore/getTodos')
    },
  },
  computed: {
    getTodos() {
      const todos = this.$store.getters['todoStore/getTodos']
      return todos
    },
  },
  mounted() {
    this.onPageLoad()
  },
}
</script>

<style></style>
