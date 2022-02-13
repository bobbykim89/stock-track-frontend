<template>
  <div class="row mx-0">
    <div class="col-md-6">
      <InputForm />
      <TodoFilter @filter="getQuery" />
    </div>
    <div class="col-md-6 mb-5">
      <div v-if="getTodos" class="mt-md-5">
        <TodoItem v-for="todo in getTodos" :key="todo.id" :todo="todo" />
      </div>
    </div>
  </div>
</template>

<script>
import InputForm from '@/components/todo-parts/InputForm.vue'
import TodoItem from '@/components/todo-parts/TodoItem.vue'
import TodoFilter from '@/components/todo-parts/TodoFilter.vue'
export default {
  components: {
    InputForm,
    TodoItem,
    TodoFilter,
  },
  data() {
    return {
      query: '',
    }
  },
  methods: {
    onPageLoad() {
      this.$store.dispatch('todoStore/getTodos')
    },
    getQuery(value) {
      this.query = value
    },
  },
  computed: {
    getTodos() {
      const todos = this.$store.getters['todoStore/getTodos']
      if (this.query === '') {
        const completed = todos.filter((todo) => {
          return todo.complete === true
        })
        const incomplete = todos.filter((todo) => {
          return todo.complete === false
        })

        return [...incomplete, ...completed]
      } else {
        const filtered = todos.filter((todo) => {
          const regex = new RegExp(`${this.query}`, 'gi')
          return todo.title.match(regex) || todo.content.match(regex)
        })
        return filtered
      }
    },
  },
  mounted() {
    this.onPageLoad()
  },
}
</script>

<style></style>
