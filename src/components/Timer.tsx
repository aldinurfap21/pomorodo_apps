
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
import { useIntentionStore } from '@/store/useIntentionStore'
import FocusDisplay from './FocusDisplay'
import IntentionSetup from './IntentionSetup'

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

  const { tickIntention, isIntentionComplete } = useIntentionStore()

  useEffect(() => {
    if (!isRunning) return

    const intervalId = setInterval(() => {
      tick()
      tickIntention()
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isRunning, tick, tickIntention])


  useEffect(() => {
    if (isRunning && isIntentionComplete()) {
      pause()
      if (isRunning && isIntentionComplete()) {
        pause()
      }
    }
  }, [isRunning, isIntentionComplete, pause])

  const showMusicSelector = mode === TimerMode.FOCUS && isRunning

  const themeClass = mode === TimerMode.SHORT_BREAK ? 'theme-short' : mode === TimerMode.LONG_BREAK ? 'theme-long' : 'theme-focus'

  return (
    <div className={`relative w-full max-w-xl mx-auto transition-all duration-500`}>
      <FocusDisplay />

      <div className={`timer-card ${themeClass} backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl transition-all duration-500 ${!isRunning && mode === TimerMode.FOCUS ? 'opacity-90 grayscale-[0.2]' : ''}`}>

        <ModeSelector
          currentMode={mode}
          onModeChange={switchMode}
        />

        <div className="opacity-80 scale-90 origin-center transition-opacity hover:opacity-100">
          <ModeLabel mode={mode} completedCycles={completedCycles} />
        </div>

        <div className="my-6 md:my-10">
          <TimerDisplay timeLeft={timeLeft} mode={mode} />
        </div>

        <div className="mb-8 opacity-90">
          <ProgressBar timeLeft={timeLeft} mode={mode} />
        </div>

        <IntentionSetup />

        <div className="mt-8 mb-8">
          <TimerControls
            isRunning={isRunning}
            onStart={start}
            onPause={pause}
            onReset={reset}
          />
        </div>

        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${showMusicSelector ? 'max-h-40 opacity-100 mt-6 pt-6 border-t border-white/5' : 'max-h-0 opacity-0 border-transparent'}`}>
          <MusicSelector />
        </div>
      </div>
    </div>
  )
}