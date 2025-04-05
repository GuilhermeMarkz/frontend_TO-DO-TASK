<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Gerenciador de Tarefas</h1>
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <task-form 
          :currentTask="currentTask"
          @task-added="refreshTasks" 
          @task-updated="refreshTasks">
        </task-form>
        <task-list 
          :tasks="tasks" 
          @task-deleted="refreshTasks" 
          @task-edited="editTask">
        </task-list>
      </div>
    </div>
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue'
import TaskForm from './components/TaskForm.vue'

export default {
  components: {
    TaskList,
    TaskForm
  },
  data() {
    return {
      tasks: [],
      currentTask: null
    }
  },
  created() {
    this.fetchTasks()
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await this.$http.get('task/')
        this.tasks = response.data
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error)
      }
    },
    
    async refreshTasks() {
      try {
        const response = await this.$http.get('task/');
        this.tasks = response.data;
        this.currentTask = null; // Resetar após atualização
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    },

    editTask(task) {
      if (!task || !task.id) {
        console.error('Tarefa inválida recebida para edição:', task);
        return;
      }
      
      console.log('Definindo tarefa para edição:', task);
      this.currentTask = { ...task }; // Cria uma cópia do objeto
    }
  }
}
</script>

<style>
.completed {
  text-decoration: line-through;
  color: #6c757d;
}
</style>