import { defineStore } from 'pinia'

export const usePriorityStore = defineStore('priorityStore', {
  state: () => ({
    priorities: []
  }),
  actions: {
    async getPriorities() {
      const res = await fetch('http://localhost:3000/priority')
      const data = await res.json()
      this.priorities = data
    }
  }
})
