<template>
  <div
    :class="[
      todo.complete ? 'border-complete' : 'border-incomplete',
      'card text-white shadow mb-3',
    ]"
    :style="{ backgroundColor: bgHandler }"
  >
    <div class="card-header d-flex justify-content-between">
      <h4 class="my-0 text-capitalize" v-b-toggle="todo.id" @click="toggleTodo">
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
            <i class="fa-solid fa-pen icon-hover"></i>
          </div>
          <div class="ml-auto mr-1">
            <i @click="deleteTodo" class="fa-solid fa-trash icon-hover"></i>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
    toggled: false,
  },
  methods: {
    toggleTodo() {
      this.toggled = !this.toggled
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
