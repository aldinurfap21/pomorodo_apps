'use client'

import { TimerMode } from '@/types/timer'

interface ModeLabelProps {
  mode: TimerMode
  completedCycles: number
}

export default function ModeLabel({ mode, completedCycles }: ModeLabelProps) {
  const getModeLabel = (): string => {
    switch (mode) {
      case TimerMode.FOCUS:
        return 'Focus Time'
      case TimerMode.SHORT_BREAK:
        return 'Short Break'
      case TimerMode.LONG_BREAK:
        return 'Long Break'
    }
  }
  
  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-semibold text-accent">{getModeLabel()}</h2>

      {mode === TimerMode.FOCUS && (
        <p className="text-sm muted mt-2">Session #{completedCycles + 1}</p>
      )}
    </div>
  )
}