import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRestStore = defineStore('rest', () => {
    const title = ref('Rest Timer')
    return { title }
})