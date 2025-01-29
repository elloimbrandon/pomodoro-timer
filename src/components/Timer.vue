<template>
    <div class="time">
        <span class="time-value">{{ formattedTime }}</span>
        <div class="controls">
            <button @click="handleStartPause">
                {{ activeStore.isRunning ? 'Pause' : 'Start' }}
            </button>
            <button @click="handleReset">Reset</button>
            <button @click="handleModeSwitch" class="mode-button">
                {{ isPomoStore ? 'Break' : 'Work' }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { useTimerStore } from '@/stores/pomoTimer'
import { useRestStore } from '@/stores/pomoRest'
import { computed, onUnmounted, watch, shallowRef } from 'vue'

// EMIT CHANGES
const emit = defineEmits(['store-change'])

const pomoStore = useTimerStore()
const restStore = useRestStore()
const activeStore = shallowRef(pomoStore)

const isPomoStore = computed(() => activeStore.value === pomoStore)

const formattedTime = computed(() => {
    const minutes = Math.floor(activeStore.value.time / 60)
    const seconds = activeStore.value.time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

let intervalId

function handleStartPause() {
    if (activeStore.value.isRunning) {
        activeStore.value.pauseTimer()
        clearInterval(intervalId)
    } else {
        activeStore.value.startTimer()
        intervalId = setInterval(() => {
            activeStore.value.decrementTimer()
        }, 1000)
    }
}

function handleReset() {
    clearInterval(intervalId)
    activeStore.value.resetTimer()
}

function handleModeSwitch() {
    if (isPomoStore.value) {
        handleBreak()
    } else {
        handleWork()
    }
}

function handleBreak() {
    clearInterval(intervalId)
    pomoStore.finished = false
    activeStore.value = restStore
    emit('store-change', restStore)
    restStore.resetTimer()
}

function handleWork() {
    clearInterval(intervalId)
    restStore.finished = false
    activeStore.value = pomoStore
    emit('store-change', pomoStore)
    pomoStore.resetTimer()
}

watch(() => pomoStore.finished, (newValue) => {
    if (newValue) {
        clearInterval(intervalId)
        activeStore.value = restStore
        emit('store-change', restStore)
        restStore.resetTimer()
    }
})

watch(() => restStore.finished, (newValue) => {
    if (newValue) {
        clearInterval(intervalId)
        activeStore.value = pomoStore
        emit('store-change', pomoStore)
        pomoStore.resetTimer()
    }
})

onUnmounted(() => {
    clearInterval(intervalId)
})
</script>