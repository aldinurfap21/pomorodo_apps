'use client'

interface TimerControlsProps {
  isRunning: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
}

export default function TimerControls({ 
  isRunning, 
  onStart, 
  onPause, 
  onReset 
}: TimerControlsProps) {
  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={isRunning ? onPause : onStart}
        className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 ${isRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} hover:scale-105 active:scale-95`}
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      
      <button
        onClick={onReset}
        className="px-8 py-3 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        Reset
      </button>
    </div>
  )
}