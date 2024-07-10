import { defineStore } from 'pinia'

export const useToDoStore = defineStore('toDoStore', {
  state: () => ({
    tasks: [],
    isLoading: false
  }),
  getters: {
    totalCount: (state) => {
      return state.tasks.length
    }
  },
  actions: {
    async getTasks() {
      this.isLoading = true
      const res = await fetch('http://localhost:3000/tasks')
      const data = await res.json()
      this.tasks = data
      this.isLoading = false
    },
    async addTask(task) {
      this.tasks.push(task)
      const res = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' }
      })
      if (res.error) {
        console.log(res.error)
      }
    },
    async editTask(data) {
      const foundIndex = this.tasks.findIndex((x) => x.id == data.id)
      this.tasks[foundIndex] = data
      const res = await fetch(`http://localhost:3000/tasks/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })

      if (res.error) {
        console.log(res.error)
      }
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((rec) => {
        return rec.id !== id
      })
      const res = await fetch(`http://localhost:3000/tasks/${id.toString()}`, {
        method: 'DELETE'
      })
      if (res.error) {
        console.log(res.error)
      }
    }
  }
})
