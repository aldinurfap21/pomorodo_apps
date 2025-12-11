'use client'

import { TimerMode, TIMER_DURATIONS } from '@/types/timer'

interface ProgressBarProps {
  timeLeft: number
  mode: TimerMode
}

export default function ProgressBar({ timeLeft, mode }: ProgressBarProps) {
  const getModeColor = (): string => {
    switch (mode) {
      case TimerMode.FOCUS:
        return 'from-red-500 to-orange-500'
      case TimerMode.SHORT_BREAK:
        return 'from-green-500 to-emerald-500'
      case TimerMode.LONG_BREAK:
        return 'from-blue-500 to-cyan-500'
    }
  }
  
  const percentage = (timeLeft / TIMER_DURATIONS[mode]) * 100
  
  return (
    <div className="w-full bg-white/20 rounded-full h-2 mb-8 overflow-hidden">
      <div 
        className={`h-full bg-gradient-to-r ${getModeColor()} transition-all duration-1000 ease-linear`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}