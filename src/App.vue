<template>
  <main>
    <!-- Heading -->
    <header>
      <img src="./assets/toDo_icon.svg" alt="to do logo" />
      <h1>ToDo List</h1>
    </header>

    <!-- newTaskForm -->
    <div class="new-task-form">
      <TaskForm
        :categoryList="categories"
        :priorityList="priorities"
        :fillType="mode"
        :editData="selectedToDo"
      />
    </div>

    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
    </nav>

    <div class="loading" v-if="toDoStore.isLoading">Loading tasks ...</div>

    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ toDoStore.totalCount }} tasks left to do</p>
      <div v-for="task in tasks" :key="task.id">
        <ToDoDetails :task="task" @editTask="editItem" />
      </div>
    </div>
    <!-- <div class="task-list" v-else>
    </div> -->
  </main>
</template>

<script>
import { ref } from 'vue'
import ToDoDetails from './components/ToDoDetails.vue'
import TaskForm from './components/TaskForm.vue'
import { useToDoStore } from './stores/toDoStore'
import { useCategoryStore } from './stores/categoryStore'
import { usePriorityStore } from './stores/priorityStore'
import { storeToRefs } from 'pinia'
export default {
  components: { ToDoDetails, TaskForm },
  setup() {
    const toDoStore = useToDoStore()
    const categoryStore = useCategoryStore()
    const priorityStore = usePriorityStore()
    const { tasks, loading, totalCount, favCount } = storeToRefs(toDoStore)
    const { categories } = storeToRefs(categoryStore)
    const { priorities } = storeToRefs(priorityStore)
    toDoStore.getTasks()
    categoryStore.getCategories()
    priorityStore.getPriorities()
    const mode = ref('Add')
    const selectedToDo = ref({ title: '', category: '', priority: '', dueDate: '' })

    const filter = ref('all')
    const editItem = (item) => {
      mode.value = 'Edit'
      Object.assign(selectedToDo.value, item)
    }
    return {
      editItem,
      mode,
      selectedToDo,
      toDoStore,
      filter,
      tasks,
      loading,
      totalCount,
      favCount,
      categories,
      priorities
    }
  }
}
</script>
