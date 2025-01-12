import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTimerStore = defineStore('timer', () => {
    const title = ref('Pomodoro Timer');
    const time = ref(1500); // 25 minutes in seconds
    // handle finished timer on finish and resest
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
        time.value = 1500
        isRunning.value = false
    }
    
    function decrementTimer() {
        if (time.value > 0) {
            time.value--
        }
    }

    return { 
        title,
        time,
        isRunning,
        startTimer,
        pauseTimer,
        resetTimer,
        decrementTimer
    }
})