<template>
  <main>
    <!-- Heading -->
    <header>
      <img src="./assets/toDo_icon.svg" alt="to do logo" />
      <h1>ToDo List</h1>
    </header>

    <!-- newToDoForm -->
    <div class="new-task-form">
      <ToDoForm
        :categoryList="categories"
        :priorityList="priorities"
        :fillType="mode"
        :editData="selectedToDo"
      />
    </div>

    <div class="flex">
      <nav class="w-64 filter">
        <button @click="getAllToDo()">All tasks</button>
        <select v-model="selectCateg" @click="filterCateg()">
          <option value="" disabled selected>Category</option>
          <option
            v-for="(categ, i) in categories"
            :key="i"
            :value="categ.name"
            :label="categ.name"
          ></option>
        </select>
        <select v-model="selectPrio" @click="filterCateg()">
          <option value="" disabled selected>Priority</option>
          <option
            v-for="(prio, ind) in priorities"
            :key="ind"
            :value="prio.name"
            :label="prio.name"
          ></option>
        </select>
      </nav>
    </div>

    <div class="loading" v-if="toDoStore.isLoading">Loading todo lists ...</div>
    <div class="task-list">
      <p>You have total {{ toDoStore.totalCount }} tasks</p>
      <div v-for="task in getFilterData" :key="task.id">
        <ToDoDetails :task="task" @editTask="editItem" />
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue'
import ToDoDetails from './components/ToDoDetails.vue'
import ToDoForm from './components/ToDoForm.vue'
import { useToDoStore } from './stores/toDoStore'
import { useCategoryStore } from './stores/categoryStore'
import { usePriorityStore } from './stores/priorityStore'
import { storeToRefs } from 'pinia'
export default {
  components: { ToDoDetails, ToDoForm },
  setup() {
    const toDoStore = useToDoStore()
    const categoryStore = useCategoryStore()
    const priorityStore = usePriorityStore()
    const { tasks, loading, totalCount, getFilterData } = storeToRefs(toDoStore)
    const { categories } = storeToRefs(categoryStore)
    const { priorities } = storeToRefs(priorityStore)
    toDoStore.getTasks()
    categoryStore.getCategories()
    priorityStore.getPriorities()
    const mode = ref('Add')
    const selectedToDo = ref({ title: '', category: '', priority: '', dueDate: '' })

    const selectCateg = ref('')
    const selectPrio = ref('')

    const editItem = (item) => {
      mode.value = 'Edit'
      Object.assign(selectedToDo.value, item)
    }

    const filterCateg = () => {
      toDoStore.setFilterType('')
      toDoStore.setCategType(selectCateg)
      toDoStore.setPrioType(selectPrio)
    }

    const getAllToDo = () => {
      toDoStore.setFilterType('All')
    }

    return {
      editItem,
      getAllToDo,
      filterCateg,
      selectCateg,
      selectPrio,
      mode,
      selectedToDo,
      toDoStore,
      tasks,
      loading,
      totalCount,
      getFilterData,
      categories,
      priorities
    }
  }
}
</script>
