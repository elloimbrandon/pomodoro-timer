<template>
    <div class="time">
        <span class="time-value">{{ formattedTime }}</span>
        <div class="controls">
            <button @click="handleStartPause">
                {{ store.isRunning ? 'Pause' : 'Start' }}
            </button>
            <button @click="handleReset">Reset</button>
        </div>
    </div>
</template>

<script setup>
import { useTimerStore } from '@/stores/pomoTimer'
import { computed, onMounted, onUnmounted } from 'vue'

const store = useTimerStore()
let intervalId

// Format time from seconds to MM:SS
const formattedTime = computed(() => {
    const minutes = Math.floor(store.time / 60)
    const seconds = store.time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

function handleStartPause() {
    if (store.isRunning) {
        store.pauseTimer()
        clearInterval(intervalId)
    } else {
        store.startTimer()
        intervalId = setInterval(() => {
            store.decrementTimer()
        }, 1000)
    }
}

function handleReset() {
    clearInterval(intervalId)
    store.resetTimer()
}

// Clean up interval when component is destroyed
onUnmounted(() => {
    clearInterval(intervalId)
})
</script>