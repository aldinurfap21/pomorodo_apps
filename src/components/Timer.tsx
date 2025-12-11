// src/components/Timer.tsx
'use client'

import { useEffect } from 'react'
import { useTimerStore } from '@/store/useTimerStore'
import { useAudioStore } from '@/store/useAudioStore'
import { TimerMode } from '@/types/timer'
import ModeSelector from './ModeSelector'
import MusicSelector from './MusicSelector'
import ModeLabel from './ModeLabel'
import TimerDisplay from './TimerDisplay'
import ProgressBar from './ProgressBar'
import TimerControls from './TimerControls'

export default function Timer() {
  const mode = useTimerStore(state => state.mode)
  const timeLeft = useTimerStore(state => state.timeLeft)
  const isRunning = useTimerStore(state => state.isRunning)
  const completedCycles = useTimerStore(state => state.completedCycles)
  
  const start = useTimerStore(state => state.start)
  const pause = useTimerStore(state => state.pause)
  const reset = useTimerStore(state => state.reset)
  const tick = useTimerStore(state => state.tick)
  const switchMode = useTimerStore(state => state.switchMode)
  
  const initAudio = useAudioStore(state => state.initAudio)
  const cleanup = useAudioStore(state => state.cleanup)
  
  useEffect(() => {
    initAudio()
    return () => cleanup()
  }, [initAudio, cleanup])
  
  useEffect(() => {
    if (!isRunning) return
    
    const intervalId = setInterval(() => {
      tick()
    }, 1000)
    
    return () => clearInterval(intervalId)
  }, [isRunning, tick])
  
  const showMusicSelector = mode === TimerMode.FOCUS && isRunning
  
  const themeClass = mode === TimerMode.SHORT_BREAK ? 'theme-short' : mode === TimerMode.LONG_BREAK ? 'theme-long' : 'theme-focus'

  return (
    <div className={`timer-card ${themeClass} rounded-3xl p-8 shadow-lg max-w-xl mx-auto`}>
      <ModeSelector 
        currentMode={mode}
        onModeChange={switchMode}
      />
      {showMusicSelector && <MusicSelector />}
      <ModeLabel mode={mode} completedCycles={completedCycles} />

      <TimerDisplay timeLeft={timeLeft} mode={mode} />

      <ProgressBar timeLeft={timeLeft} mode={mode} />
      
      <TimerControls 
        isRunning={isRunning}
        onStart={start}
        onPause={pause}
        onReset={reset}
      />
    </div>
  )
}