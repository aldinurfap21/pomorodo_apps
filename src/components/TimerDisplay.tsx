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
  };
  
  return (
    <div className="text-8xl font-bold text-center mb-8 text-accent">
      {formatTime(timeLeft)}
    </div>
  )
}