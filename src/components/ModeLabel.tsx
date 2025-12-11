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
      <h2 className="text-2xl font-semibold text-white/90">
        {getModeLabel()}
      </h2>
      
      {/* Show session counter during focus time */}
      {mode === TimerMode.FOCUS && (
        <p className="text-sm text-white/60 mt-2">
          Session #{completedCycles + 1}
        </p>
      )}
    </div>
  )
}