import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRestStore = defineStore('rest', () => {
    const title = ref('Let\'s take a Break');
    const time = ref(300); // 5 minutes in seconds
    const finished = ref(false);
    const isRunning = ref(false);
    
    // Methods
    function startTimer() {
        isRunning.value = true
    }
    
    function pauseTimer() {
        isRunning.value = false
    }
    
    function resetTimer() {
        time.value = 300
        isRunning.value = false
    }
    
    function decrementTimer() {
        if (time.value > 0) {
            time.value--
        } else {
            finished.value = true
        }
    }

    return { 
        title,
        time,
        isRunning,
        startTimer,
        pauseTimer,
        resetTimer,
        decrementTimer,
        finished
    }
})