// src/types/timer.ts
export enum TimerMode {
  FOCUS = 'focus',
  SHORT_BREAK = 'short break',
  LONG_BREAK = 'long break',
}

export const TIMER_DURATIONS: Record<TimerMode, number> = {
  [TimerMode.FOCUS]: 25 * 60,
  [TimerMode.SHORT_BREAK]: 5 * 60,
  [TimerMode.LONG_BREAK]: 30 * 60,
}

export interface TimerState {
  mode: TimerMode
  timeLeft: number
  isRunning: boolean
  completedCycles: number
}

export interface AudioState {
  isLofiPlaying: boolean
  isAlarmPlaying: boolean
}