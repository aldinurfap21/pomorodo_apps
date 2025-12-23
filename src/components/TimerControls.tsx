import { useSoundEffect } from "@/hooks/useSoundEffect"
import { SOUND_ASSETS } from "@/config/appConfig"

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

  const playClick = useSoundEffect(SOUND_ASSETS.CLICK)

  const handleToggle = () => {
    playClick()
    if (isRunning) {
      onPause()
    } else {
      onStart()
    }
  }

  const handleReset = () => {
    playClick()
    onReset()
  }

  return (
    <div className="flex justify-center gap-4">
      <ControlButton
        isActive={isRunning}
        onClick={handleToggle}
        variant="primary"
      >
        {isRunning ? 'Pause' : 'Start'}
      </ControlButton>

      <ControlButton
        isActive={false}
        onClick={handleReset}
        variant="danger"
      >
        Reset
      </ControlButton>
    </div>
  )
}



function ControlButton({
  isActive,
  onClick,
  children,
  variant
}: {
  isActive: boolean
  onClick: () => void
  children: React.ReactNode
  variant: 'primary' | 'danger'
}) {
  const baseStyles = "px-8 py-3 rounded-xl font-semibold tracking-wide transition-all duration-300 transform active:scale-95 shadow-sm hover:shadow-md"

  let colorStyles = ""
  if (variant === 'primary') {
    colorStyles = isActive
      ? 'bg-amber-500/90 hover:bg-amber-500 text-white ring-2 ring-amber-500/20'
      : 'bg-white text-emerald-900 hover:bg-emerald-50'
  } else {
    colorStyles = 'text-white/60 hover:text-rose-200 hover:bg-white/5'
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${colorStyles}`}>
      {children}
    </button>
  )
}