import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    categories: []
  }),
  actions: {
    async getCategories() {
      // const res = await fetch('http://localhost:3000/category')
      const res = await fetch('https://todo-list-api-e8q0.onrender.com/category')
      const data = await res.json()
      this.categories = data
    }
  }
})
