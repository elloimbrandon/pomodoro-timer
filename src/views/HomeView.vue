<template>
  <main>
    <h1>{{ store.title }}</h1>
    <Timer @store-change="handleStoreChange"/>
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

// Watch for timer completion and swap stores
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