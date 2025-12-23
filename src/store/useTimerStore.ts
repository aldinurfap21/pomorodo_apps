
'use client'

import { create } from 'zustand'
import { TimerMode, TIMER_DURATIONS, type TimerState } from '@/types/timer'
import { useAudioStore } from './useAudioStore'
import { AudioType } from '@/types/audio'

interface TimerStore extends TimerState {
  start: () => void
  pause: () => void
  reset: () => void
  tick: () => void
  switchMode: (newMode: TimerMode) => void
  completeSession: () => void
  todayFocusTime: number
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  mode: TimerMode.FOCUS,
  timeLeft: TIMER_DURATIONS[TimerMode.FOCUS],
  isRunning: false,
  completedCycles: 0,
  todayFocusTime: 0,

  start: () => {
    const { mode } = get()
    const audioStore = useAudioStore.getState()

    if (mode === TimerMode.FOCUS) {
      const { currentMusicType, isMusicPlaying } = audioStore
      if (currentMusicType !== AudioType.MUTE && !isMusicPlaying) {
        audioStore.resumeMusic()
      }
    }

    set({ isRunning: true })
  },

  pause: () => {
    const audioStore = useAudioStore.getState()
    if (audioStore.isMusicPlaying) audioStore.pauseMusic()
    set({ isRunning: false })
  },

  reset: () => {
    const { mode } = get()
    set({ timeLeft: TIMER_DURATIONS[mode], isRunning: false })
  },

  tick: () => {
    const { timeLeft, completeSession, mode, todayFocusTime } = get()

    const newFocusTime = mode === TimerMode.FOCUS ? todayFocusTime + 1 : todayFocusTime

    if (timeLeft <= 0) {
      completeSession()
      set({ todayFocusTime: newFocusTime })
      return
    }
    set({ timeLeft: timeLeft - 1, todayFocusTime: newFocusTime })
  },

  switchMode: (newMode) => {
    useAudioStore.getState().stopMusic()
    set({ mode: newMode, timeLeft: TIMER_DURATIONS[newMode], isRunning: false })
  },

  completeSession: () => {
    const { mode, completedCycles } = get()
    useAudioStore.getState().playAlarm()

    if (mode === TimerMode.FOCUS) {
      const newCycles = completedCycles + 1
      const nextMode = newCycles % 4 === 0 ? TimerMode.LONG_BREAK : TimerMode.SHORT_BREAK
      set({ mode: nextMode, timeLeft: TIMER_DURATIONS[nextMode], isRunning: false, completedCycles: newCycles })
    } else {
      set({ mode: TimerMode.FOCUS, timeLeft: TIMER_DURATIONS[TimerMode.FOCUS], isRunning: false })
    }
  },
}))