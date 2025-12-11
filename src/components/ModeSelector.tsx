'use client'

import { TimerMode } from '@/types/timer'
import { useTimerStore } from '@/store/useTimerStore'

interface ModeSelectorProps {
  currentMode: TimerMode
  onModeChange: (mode: TimerMode) => void
}

export default function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  const isRunning = useTimerStore(state => state.isRunning)
  
  const modes = [
    { value: TimerMode.FOCUS, label: 'Focus', emoji: '🎯' },
    { value: TimerMode.SHORT_BREAK, label: 'Short Break', emoji: '☕' },
    { value: TimerMode.LONG_BREAK, label: 'Long Break', emoji: '🌴' },
  ]
  
  const handleModeChange = (newMode: TimerMode) => {
    if (newMode === currentMode) return
    
    if (isRunning) {
      const confirmed = window.confirm(
        'Timer is running. Are you sure you want to switch mode? Your progress will be lost.'
      )
      if (!confirmed) return
    }
    
    onModeChange(newMode)
  }
  
  return (
    <div className="flex justify-center gap-2 mb-6">
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => handleModeChange(mode.value)}
          className={`
            px-6 py-2 rounded-lg font-medium
            transition-all duration-200
            ${currentMode === mode.value
              ? 'bg-white text-gray-900 shadow-lg scale-105'
              : 'bg-white/20 text-white/80 hover:bg-white/30'
            }
          `}
        >
          <span className="mr-2">{mode.emoji}</span>
          {mode.label}
        </button>
      ))}
    </div>
  )
}