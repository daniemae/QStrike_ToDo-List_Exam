<template>
  <form @submit.prevent="handleSubmit()">
    <input type="text" placeholder="i need to.." v-model="toDoDetails.title" />
    <select v-model="toDoDetails.category">
      <option value="" disabled selected>Category</option>
      <option
        v-for="(categ, index) in categoryList"
        :key="index"
        :label="categ.name"
        :value="categ.name"
      />
    </select>
    <select v-model="toDoDetails.priority">
      <option value="" disabled selected>Priority</option>
      <option v-for="(prio, i) in priorityList" :key="i" :label="prio.name" :value="prio.name" />
    </select>
    <input type="date" v-model="toDoDetails.dueDate" />
    <button>{{ fillType }}</button>
    <button
      v-if="Object.values(toDoDetails).some((value) => value != '') && fillType == 'Add'"
      @click="handleClear()"
    >
      Clear
    </button>
  </form>
</template>

<script>
import { useToDoStore } from '@/stores/toDoStore'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

export default {
  props: {
    categoryList: {
      required: true,
      type: Array
    },
    priorityList: {
      required: true,
      type: Array
    },
    fillType: {
      required: true,
      type: String
    },
    editData: {
      required: false,
      type: Object
    }
  },
  setup(props) {
    const toDoStore = useToDoStore()
    const { tasks } = storeToRefs(toDoStore)
    const toDoDetails = ref({ title: '', category: '', priority: '', dueDate: '' })

    watch(props, () => {
      Object.assign(toDoDetails.value, props.editData)
    })

    const handleSubmit = () => {
      if (Object.values(toDoDetails.value).every((value) => value != '')) {
        if (props.fillType == 'Add') {
          let highestId = 0
          if (tasks.value.length > 0) {
            highestId = 1 + Math.max(...tasks.value.map((task) => parseInt(task.id)))
          } else {
            highestId = 1
          }
          const selectedDate = new Date(toDoDetails.value.dueDate)
          const today = new Date()
          if (selectedDate > today) {
            toDoStore.addTask({
              title: toDoDetails.value.title,
              category: toDoDetails.value.category,
              priority: toDoDetails.value.priority,
              dueDate: toDoDetails.value.dueDate,
              id: highestId.toString()
            })
            toDoDetails.value = { title: '', category: '', priority: '', dueDate: '' }
          } else {
            alert('Date must not set from past')
          }
        } else {
          toDoStore.editTask({
            title: toDoDetails.value.title,
            category: toDoDetails.value.category,
            priority: toDoDetails.value.priority,
            dueDate: toDoDetails.value.dueDate,
            id: toDoDetails.value.id
          })
          toDoDetails.value = { title: '', category: '', priority: '', dueDate: '' }
        }
      } else {
        alert('Please fill-up all required fields')
      }
    }
    const handleClear = () => {
      toDoDetails.value = { title: '', category: '', priority: '', dueDate: '' }
    }
    return { handleSubmit, toDoDetails, handleClear, tasks }
  }
}
</script>
