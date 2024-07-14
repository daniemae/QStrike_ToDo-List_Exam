import { defineStore } from 'pinia'

export const usePriorityStore = defineStore('priorityStore', {
  state: () => ({
    priorities: []
  }),
  actions: {
    async getPriorities() {
      const res = await fetch('https://todo-list-api-e8q0.onrender.com/priority')
      const data = await res.json()
      this.priorities = data
    }
  }
})
