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
    class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
    >{{ task.category }}</span
  >
  <span :class="priorityColor(task.priority)">{{ task.priority }}</span>
  <span
    class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"
    >{{ task.dueDate }}</span
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
    return { toDoStore, priorityColor }
  }
}
</script>
