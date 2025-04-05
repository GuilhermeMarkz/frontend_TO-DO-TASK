<template>
  <div class="card">
    <div class="card-header">
      <h5>Lista de Tarefas</h5>
    </div>
    <div class="card-body">
      <div v-if="tasks.length === 0" class="alert alert-info">
        Nenhuma tarefa encontrada. Adicione uma nova tarefa!
      </div>
      <ul v-else class="list-group">
        <task-item 
          v-for="task in tasks" 
          :key="task.id" 
          :task="task"
          @task-deleted="handleTaskDeleted"
          @edit-task="handleEditTask"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue'

export default {
  name: 'TaskList',
  components: {
    TaskItem
  },
  props: {
    tasks: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    handleEditTask(task) {
      console.log('TaskList recebeu tarefa para edição:', task)
      this.$emit('task-edited', task)
    },
    handleTaskDeleted(taskId) {
      this.$emit('task-deleted', taskId)
    }
  }
}
</script>