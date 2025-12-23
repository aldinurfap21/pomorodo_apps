'use client'

import { useState } from 'react'
import { useIntentionStore } from '@/store/useIntentionStore'

export default function IntentionSetup() {
    const { isIntentionActive, intentionDuration, intentionElapsed, setIntention, clearIntention } = useIntentionStore()
    const [isOpen, setIsOpen] = useState(false)

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        return `${h}h ${m}m`
    }

    const handleSetIntention = (hours: number, minutes: number) => {
        const duration = hours * 3600 + minutes * 60
        if (duration > 0) {
            setIntention(duration)
            setIsOpen(false)
        }
    }

    if (isIntentionActive && intentionDuration) {
        const remaining = Math.max(0, intentionDuration - intentionElapsed)
        const progress = Math.min(100, (intentionElapsed / intentionDuration) * 100)

        return (
            <div className="mt-8 pt-6 border-t border-white/10 dark:border-white/5">
                <div className="flex items-center justify-between mb-2 text-sm text-white/60">
                    <span>Intention: {formatTime(intentionDuration)}</span>
                    <button
                        onClick={clearIntention}
                        className="hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-white/40 transition-all duration-1000 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="mt-1 text-xs text-right text-white/40">
                    {formatTime(remaining)} left
                </div>
            </div>
        )
    }

    if (!isOpen) {
        return (
            <div className="mt-8 text-center">
                <button
                    onClick={() => setIsOpen(true)}
                    className="text-sm text-white/40 hover:text-white/60 transition-colors"
                >
                    + Set Intention
                </button>
            </div>
        )
    }

    return (
        <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 animate-in fade-in zoom-in-95">
            <h3 className="text-sm font-medium text-white/80 mb-4 text-center">Set Session Goal</h3>
            <div className="flex justify-center gap-2 mb-4">
                {[0.5, 1, 2, 4].map((hours) => (
                    <button
                        key={hours}
                        onClick={() => handleSetIntention(Math.floor(hours), MapHoursToMinutes(hours))}
                        className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 rounded-lg text-white/80 transition-colors"
                    >
                        {hours}h
                    </button>
                ))}
            </div>

            <div className="text-center">
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-white/40 hover:text-white transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

function MapHoursToMinutes(val: number): number {

    if (val === 0.5) return 30;
    return 0;
}
