import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTimerStore = defineStore('timer', () => {
    const title = ref('Pomodoro Timer');
    // const time = ref(1500); // 25 minutes in seconds
    const time = ref(10); // 10 seconds

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
        time.value = 10 // 10 seconds
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