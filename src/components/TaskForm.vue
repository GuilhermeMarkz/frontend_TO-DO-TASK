<template>
    <div class="card mb-4">
      <div class="card-header">
        <h5>{{ currentTask ? 'Editar Tarefa' : 'Adicionar Nova Tarefa' }}</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="title" class="form-label">Título</label>
            <input type="text" class="form-control" id="title" v-model="formData.titulo" required>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Descrição</label>
            <textarea class="form-control" id="description" rows="3" v-model="formData.descricao"></textarea>
          </div>
          <div class="mb-3">
            <label for="status" class="form-label">Status</label>
            <select class="form-select" id="status" v-model="formData.status">
              <option value="Pendente">Pendente</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluída">Concluída</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">
            {{ currentTask ? 'Atualizar' : 'Adicionar' }}
          </button>
          <button v-if="currentTask" type="button" class="btn btn-secondary ms-2" @click="cancelEdit">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentTask: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        formData: {
          titulo: '',
          descricao: '',
          status: 'Pendente'
        }
      }
    },
    watch: {
      currentTask: {
        handler(newVal) {
          console.log('TaskForm recebeu currentTask:', newVal);
          if (newVal) {
            this.formData = {
              titulo: newVal.titulo,
              descricao: newVal.descricao,
              status: newVal.status
            }
          } else {
            this.resetForm()
          }
        },
        immediate: true
      }
    },
    methods: {
      resetForm() {
        this.formData = {
          titulo: '',
          descricao: '',
          status: 'Pendente'
        }
      },
      cancelEdit() {
        this.$emit('task-updated')
      },
      async submitForm() {
        try {
          if (this.currentTask) {
            // Atualizar tarefa existente
            await this.$http.put(`task/${this.currentTask.id}/`, this.formData)
            this.$emit('task-updated')
          } else {
            // Criar nova tarefa
            await this.$http.post('task/', this.formData)
            this.$emit('task-added')
          }
          this.resetForm()
        } catch (error) {
          console.error('Erro ao salvar tarefa:', error)
        }
      }
    }
  }
  </script>