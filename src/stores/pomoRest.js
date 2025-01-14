import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRestStore = defineStore('rest', () => {
    const title = ref('Rest Timer');
    // const time = ref(300); // 5 minutes in seconds
    const time = ref(15); // 10 seconds
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
        // time.value = 1500
        time.value = 15 // 10 seconds
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