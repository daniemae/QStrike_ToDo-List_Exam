<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i class="material-icons" @click="$emit('editTask', task)" style="color: cornflowerblue"
        >edit</i
      >
      <i class="material-icons" @click="toDoStore.deleteTask(task.id)" style="color: red">delete</i>
    </div>
  </div>
  <span
    class="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 rounded-md bg-gray-50 ring-1 ring-inset ring-gray-500/10"
    >{{ task.category }}</span
  >
  <span :class="priorityColor(task.priority)">{{ task.priority }}</span>
  <span
    v-if="isExpired(task.dueDate) != 'expired'"
    class="inline-flex items-center px-2 py-1 text-xs font-medium text-purple-700 rounded-md bg-purple-50 ring-1 ring-inset ring-purple-700/10"
    >{{ isExpired(task.dueDate) }}</span
  >

  <span
    v-else
    class="inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 rounded-md bg-red-50 ring-1 ring-inset ring-red-600/10"
    >{{ isExpired(task.dueDate) }}</span
  >
</template>
<script>
import { useToDoStore } from '@/stores/toDoStore'

export default {
  props: ['task'],
  emits: ['editTask'],
  setup() {
    const toDoStore = useToDoStore()
    const priorityColor = (priority) => {
      if (priority == 'low') {
        return 'inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20'
      } else if (priority == 'high') {
        return 'inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10'
      } else {
        return 'inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10'
      }
    }
    const isExpired = (dueDate) => {
      const currentYear = new Date().getFullYear()
      const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0')
      const currentDate = new Date().getDate().toString().padStart(2, '0')
      return `${currentYear}-${currentMonth}-${currentDate}` <= dueDate ? dueDate : 'expired'
    }
    return { toDoStore, priorityColor, isExpired }
  }
}
</script>
