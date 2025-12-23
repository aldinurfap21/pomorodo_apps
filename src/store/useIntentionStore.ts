import { create } from 'zustand'

interface IntentionState {
    intentionDuration: number | null
    intentionElapsed: number
    isIntentionActive: boolean

    setIntention: (duration: number) => void
    clearIntention: () => void
    tickIntention: () => void
    isIntentionComplete: () => boolean
}

export const useIntentionStore = create<IntentionState>((set, get) => ({
    intentionDuration: null,
    intentionElapsed: 0,
    isIntentionActive: false,

    setIntention: (duration: number) => {
        if (duration > 43200) {
            console.warn('Intention duration cannot exceed 12 hours')
            return
        }
        set({
            intentionDuration: duration,
            intentionElapsed: 0,
            isIntentionActive: true
        })
    },

    clearIntention: () => {
        set({
            intentionDuration: null,
            intentionElapsed: 0,
            isIntentionActive: false
        })
    },

    tickIntention: () => {
        const { isIntentionActive, intentionDuration, intentionElapsed } = get()

        if (isIntentionActive && intentionDuration !== null) {
            if (intentionElapsed >= intentionDuration) {
                return
            }
            set({ intentionElapsed: intentionElapsed + 1 })
        }
    },

    isIntentionComplete: () => {
        const { isIntentionActive, intentionDuration, intentionElapsed } = get()
        if (!isIntentionActive || intentionDuration === null) return false
        return intentionElapsed >= intentionDuration
    }
}))
