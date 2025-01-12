<script setup>
import Timer from '@/components/Timer.vue'
import { useTimerStore } from '@/stores/pomoTimer'
import { useRestStore } from '@/stores/pomoRest'

const pomoStore = useTimerStore()
const restStore = useRestStore()
</script>

<template>
  <main>
    <h1>{{ pomoStore.title }}</h1>
    <Timer />
  </main>
</template>
