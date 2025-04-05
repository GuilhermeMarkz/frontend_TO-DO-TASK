<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <div>
      <h6>{{ task.titulo }}</h6>
      <p class="mb-1 text-muted">{{ task.descricao }}</p>
      <small class="text-muted">Criado em: {{ formatDate(task.dataCriacao) }}</small>
      <br>
      <span class="badge" :class="statusClass">{{ task.status }}</span>
    </div>
    <div>
      <button @click="editTask" class="btn btn-sm btn-outline-primary me-2">
        Editar
      </button>
      <button @click="deleteTask" class="btn btn-sm btn-outline-danger">
        Excluir
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      required: true,
      validator: (value) => {
        return 'id' in value && 'titulo' in value
      }
    }
  },
  computed: {
    statusClass() {
      return {
        'bg-primary': this.task.status === 'Pendente',
        'bg-warning': this.task.status === 'Em Andamento',
        'bg-success': this.task.status === 'Concluída'
      }
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }
      return new Date(dateString).toLocaleDateString('pt-BR', options)
    },
    editTask() {
      this.$emit('edit-task', { ...this.task })
    },
    
    async deleteTask() {
      if (!this.task?.id) {
        console.error('ID da tarefa não encontrado')
        return
      }

      if (confirm(`Tem certeza que deseja excluir "${this.task.titulo}"?`)) {
        try {
          await this.$http.delete(`/task/${this.task.id}/`)
          this.$emit('task-deleted', this.task.id)
        } catch (error) {
          console.error('Erro ao excluir tarefa:', error)
          if (error.response) {
            alert(`Erro: ${error.response.data.detail || 'Falha ao excluir'}`)
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: #6c757d;
}
</style>