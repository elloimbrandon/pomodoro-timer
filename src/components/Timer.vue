<template>
    <div class="flex flex-col items-center space-y-8 p-6 md:p-12 bg-white rounded-2xl shadow-xl w-full">
        <span class="time-value text-6xl font-mono font-bold text-sky-900">
            {{ formattedTime }}
        </span>
        <div class="controls flex gap-4">
            <button 
                @click="handleStartPause"
                class="px-2 py-1 md:px-6 md:py-3 w-16 md:w-24 rounded-lg font-semibold transition-all"
                :class="activeStore.isRunning 
                    ? 'bg-rose-500 hover:bg-rose-600 text-white' 
                    : 'bg-teal-500 hover:bg-teal-600 text-white'"
            >
                {{ activeStore.isRunning ? 'Pause' : 'Start' }}
            </button>
            <button 
                @click="handleReset"
                class="px-2 py-1 md:px-6 md:py-3 w-16 md:w-24 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-all"
            >
                Reset
            </button>
            <button 
                @click="handleModeSwitch" 
                class="px-2 py-1 md:px-6 md:py-3 w-16 md:w-24 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-semibold transition-all"
            >
                {{ isPomoStore ? 'Break' : 'Work' }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { useTimerStore } from '@/stores/pomoTimer'
import { useRestStore } from '@/stores/pomoRest'
import { computed, onUnmounted, watch, shallowRef } from 'vue'

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