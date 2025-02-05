<template>
  <main class="antialiased w-full md:w-[800px] my-6 mx-6 md:mx-auto min-h-[50vh] bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl shadow-lg flex items-center justify-center">
    <section class="flex flex-col items-center justify-center space-y-6">
      <h1 class="text-4xl font-bold text-indigo-900">Pomodoro Timer</h1>
      <h2 class="text-xl text-indigo-700 font-medium">{{ store.title }}</h2>
      <Timer @store-change="handleStoreChange"/>
    </section>
  </main>
</template>

<script setup>
import Timer from '@/components/Timer.vue'
import { useTimerStore } from '@/stores/pomoTimer'
import { useRestStore } from '@/stores/pomoRest'
import { ref, watch } from 'vue'

const pomoStore = useTimerStore()
const restStore = useRestStore()

const store = ref(pomoStore)

// After timer is complete we swap the stores
watch(() => pomoStore.finished, (newValue) => {
    if (newValue) {
        store.value = restStore
    }
})

watch(() => restStore.finished, (newValue) => {
    if (newValue) {
        store.value = pomoStore
    }
})

function handleStoreChange(newStore) {
    store.value = newStore
}

</script>