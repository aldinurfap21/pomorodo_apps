'use client'

import { TimerMode } from '@/types/timer'

interface TimerDisplayProps {
  timeLeft: number
  mode: TimerMode
}

export default function TimerDisplay({ timeLeft, mode }: TimerDisplayProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
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
  
  return (
    <div className={`
      text-8xl font-bold text-center mb-8
      bg-gradient-to-r ${getModeColor()}
      bg-clip-text text-transparent
    `}>
      {formatTime(timeLeft)}
    </div>
  )
}