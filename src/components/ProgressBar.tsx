
'use client'

import { TimerMode, TIMER_DURATIONS } from '@/types/timer'

interface ProgressBarProps {
  timeLeft: number
  mode: TimerMode
}

export default function ProgressBar({ timeLeft, mode }: ProgressBarProps) {
  const percentage = (timeLeft / TIMER_DURATIONS[mode]) * 100

  const barStyle: React.CSSProperties = {
    width: `${percentage}%`,
    background: 'var(--accent)',
    transition: 'width 1s linear',
    height: '100%',
  }

  return (
    <div className="w-full bg-white/10 rounded-full h-2 mb-8 overflow-hidden">
      <div className="h-full" style={barStyle} />
    </div>
  )
}