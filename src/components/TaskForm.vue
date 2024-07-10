<template>
  <form @submit.prevent="handleSubmit()">
    <input type="text" placeholder="i need to.." v-model="toDoDetails.title" />
    <select v-model="toDoDetails.category">
      <option
        v-for="(categ, index) in categoryList"
        :key="index"
        :label="categ.name"
        :value="categ.name"
      />
    </select>
    <select v-model="toDoDetails.priority">
      <option v-for="(prio, i) in priorityList" :key="i" :label="prio.name" :value="prio.name" />
    </select>
    <input type="date" v-model="toDoDetails.dueDate" />
    <button>{{ fillType }}</button>
    <button v-if="Object.values(toDoDetails).some((value) => value != '')" @click="handleClear()">
      Clear
    </button>
  </form>
</template>

<script>
import { useToDoStore } from '@/stores/toDoStore'
import { ref, watch } from 'vue'

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
    const taskStore = useToDoStore()
    const toDoDetails = ref({ title: '', category: '', priority: '', dueDate: '' })

    watch(props, () => {
      Object.assign(toDoDetails.value, props.editData)
    })

    const handleSubmit = () => {
      if (Object.values(toDoDetails.value).every((value) => value != '')) {
        if (props.fillType == 'Add') {
          taskStore.addTask({
            title: toDoDetails.value.title,
            category: toDoDetails.value.category,
            priority: toDoDetails.value.priority,
            dueDate: toDoDetails.value.dueDate,
            id: Math.floor(Math.random() * 1000).toString()
          })
        } else {
          taskStore.editTask({
            title: toDoDetails.value.title,
            category: toDoDetails.value.category,
            priority: toDoDetails.value.priority,
            dueDate: toDoDetails.value.dueDate,
            id: toDoDetails.value.id
          })
        }

        toDoDetails.value = { title: '', category: '', priority: '', dueDate: '' }
      }
    }
    const handleClear = () => {
      toDoDetails.value = { title: '', category: '', priority: '', dueDate: '' }
    }
    return { handleSubmit, toDoDetails, handleClear }
  }
}
</script>
