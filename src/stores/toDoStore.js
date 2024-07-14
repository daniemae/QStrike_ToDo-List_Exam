import { defineStore } from 'pinia'

export const useToDoStore = defineStore('toDoStore', {
  state: () => ({
    tasks: [],
    isLoading: false,
    selectedFilter: '',
    selectedCategory: '',
    selectedPriorities: ''
  }),
  getters: {
    getFilterData: (state) => {
      if (state.selectedFilter == 'All') {
        state.selectedCategory = ''
        state.selectedPriorities = ''
        return state.tasks
      } else {
        return state.tasks
          .filter((rec) => {
            if (state.selectedCategory) {
              return rec.category.includes(state.selectedCategory)
            } else {
              return rec
            }
          })
          .filter((val) => {
            if (state.selectedPriorities) {
              return val.priority.includes(state.selectedPriorities)
            } else {
              return val
            }
          })
      }
    },
    totalCount: (state) => {
      return state.tasks.length
    }
  },
  actions: {
    async getTasks() {
      this.isLoading = true
      // const res = await fetch('http://localhost:3000/tasks')
      const res = await fetch('https://todo-list-api-e8q0.onrender.com/tasks')
      const data = await res.json()
      this.tasks = data
      this.isLoading = false
    },
    async addTask(task) {
      this.tasks.push(task)
      this.selectedFilter = 'All'
      // const res = await fetch('http://localhost:3000/tasks', {
      const res = await fetch('https://todo-list-api-e8q0.onrender.com/tasks', {
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
      this.selectedFilter = 'All'
      // const res = await fetch(`http://localhost:3000/tasks/${data.id}`, {
      const res = await fetch(`https://todo-list-api-e8q0.onrender.com/tasks/${data.id}`, {
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
      this.selectedFilter = 'All'
      // const res = await fetch(`http://localhost:3000/tasks/${id.toString()}`, {
      const res = await fetch(`https://todo-list-api-e8q0.onrender.com/tasks/${id.toString()}`, {
        method: 'DELETE'
      })
      if (res.error) {
        console.log(res.error)
      }
    },

    getSelection(type) {
      this.selectedFilter = type
    },

    setCategType(type) {
      this.selectedCategory = type
    },
    setPrioType(type) {
      this.selectedPriorities = type
    },
    setFilterType(type) {
      this.selectedFilter = type
    }
  }
})
