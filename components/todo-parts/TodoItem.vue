<template>
  <div
    :class="[
      todo.complete ? 'border-complete' : 'border-incomplete',
      'card text-white shadow mb-3',
    ]"
    :style="{ backgroundColor: bgHandler }"
  >
    <div class="card-header d-flex justify-content-between">
      <h4
        class="my-0 pr-5 text-capitalize"
        v-b-toggle="todo.id"
        @click="toggleTodo"
      >
        {{ todo.title }}
        <span class="h5"
          ><i
            v-bind:class="[
              toggled ? 'fa-chevron-up' : 'fa-chevron-down',
              'fa-solid  ml-2',
            ]"
          ></i
        ></span>
      </h4>
      <h4
        v-bind:class="[
          todo.complete ? 'icon-complete' : 'icon-incomplete',
          'my-0',
        ]"
        @click="toggleComplete"
      >
        <i class="fa-solid fa-circle-check"></i>
      </h4>
    </div>
    <b-collapse :id="todo.id">
      <div class="card-body row">
        <div class="col-10">
          <span>{{ todo.content }}</span>
        </div>
        <div class="col-2 d-flex flex-column">
          <div class="ml-auto mb-2 mr-1">
            <i @click="toggleModal" class="fa-solid fa-pen icon-hover"></i>
          </div>
          <div class="ml-auto mr-1">
            <i @click="deleteTodo" class="fa-solid fa-trash icon-hover"></i>
          </div>
        </div>
      </div>
    </b-collapse>
    <div v-if="todoEdit">
      <b-modal
        v-model="showModal"
        header-bg-variant="dark"
        header-text-variant="light"
      >
        <b-form @submit.prevent="editTodo" class="mx-auto mt-3 mb-3">
          <b-form-group id="title-group" label="Title:" label-for="title">
            <b-form-input
              id="title"
              type="text"
              v-model="todoEdit.title"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group id="content-group" label="Content:" label-for="content">
            <b-form-textarea id="content" v-model="todoEdit.content" rows="6">
            </b-form-textarea>
          </b-form-group>
          <b-form-group class="d-flex justify-content-center">
            <b-form-radio-group v-model="todoEdit.type">
              <b-form-radio value="personal"
                ><span class="text-dark">Personal</span></b-form-radio
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
        <template #modal-footer>
          <b-button>Close</b-button>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      toggled: false,
      showModal: false,
      todoEdit: null,
    }
  },
  async fetch() {
    await this.getTodoEdit()
    console.log(this.todoEdit)
  },
  methods: {
    toggleTodo() {
      this.toggled = !this.toggled
    },
    toggleModal() {
      this.showModal = !this.showModal
      this.$nuxt.refresh()
    },
    async getTodoEdit() {
      const todos = await this.$store.getters['todoStore/getTodos']
      const currentTodoList = todos.filter((todo) => {
        return todo.id === this.todo.id
      })
      const currentTodo = currentTodoList[0]
      if (currentTodo) {
        this.todoEdit = { ...currentTodo }
      }
    },
    async toggleComplete() {
      const complete = !this.todo.complete
      await this.$store.dispatch('todoStore/toggleComplete', {
        id: this.todo.id,
        complete,
      })
    },
    async deleteTodo() {
      console.log(this.todo)
      await this.$store.dispatch('todoStore/deleteTodo', {
        id: this.todo.id,
      })
    },
    async editTodo() {
      console.log(this.todoEdit)
    },
  },
  computed: {
    bgHandler() {
      if (this.todo.type === 'personal') {
        return '#343a40'
      } else if (this.todo.type === 'work') {
        return '#166534'
      } else {
        return '#075985'
      }
    },
  },
}
</script>

<style scoped>
.border-incomplete {
  border-left: 4px solid #dc3545;
}

.border-complete {
  border-left: 4px solid #198754;
}

.icon-incomplete {
  color: #dc3545;
}

.icon-complete {
  color: #198754;
}

.icon-incomplete:hover {
  color: #e65c69;
}

.icon-complete:hover {
  color: #439f78;
}
.icon-hover:hover {
  color: #adb5bd;
}
</style>
