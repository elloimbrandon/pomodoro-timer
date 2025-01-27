<template>
    <div class="time">
        <span class="time-value">{{ formattedTime }}</span>
        <div class="controls">
            <button @click="handleStartPause">
                {{ store.isRunning ? 'Pause' : 'Start' }}
            </button>
            <button @click="handleReset">Reset</button>
            <button @click="handleBreak">Break</button>
        </div>
    </div>
</template>

<script setup>
import { useTimerStore } from '@/stores/pomoTimer'
import { useRestStore } from '@/stores/pomoRest'
import { computed, onMounted, onUnmounted, watch, ref } from 'vue'

const pomoStore = useTimerStore()
const restStore = useRestStore()

const store = ref(pomoStore)
let intervalId

// Watch for timer completion and swap stores
watch(() => pomoStore.finished, (newValue) => {
    if (newValue) {
        clearInterval(intervalId)
        store.value = restStore
        restStore.resetTimer()
        restStore.pauseTimer()
    }
})

watch(() => restStore.finished, (newValue) => {
    if (newValue) {
        clearInterval(intervalId)
        store.value = pomoStore
        pomoStore.resetTimer()
        pomoStore.pauseTimer()
    }
})

const formattedTime = computed(() => {
    const minutes = Math.floor(store.value.time / 60)
    const seconds = store.value.time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

function handleStartPause() {
    if (store.value.isRunning) {
        store.value.pauseTimer()
        clearInterval(intervalId)
    } else {
        store.value.startTimer()
        intervalId = setInterval(() => {
            store.value.decrementTimer()
        }, 1000)
    }
}

function handleReset() {
    clearInterval(intervalId)
    store.value.resetTimer()
}

function handleBreak() {
    clearInterval(intervalId)
    store.value = restStore
    restStore.resetTimer()
    restStore.pauseTimer()
}

// Clean up interval when component is destroyed
onUnmounted(() => {
    clearInterval(intervalId)
})
</script>