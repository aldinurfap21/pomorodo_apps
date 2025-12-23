'use client'

import { useTimerStore } from '@/store/useTimerStore'
import { useEffect, useState } from 'react'

export default function FocusDisplay() {
    const todayFocusTime = useTimerStore(state => state.todayFocusTime)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const hours = Math.floor(todayFocusTime / 3600)
    const minutes = Math.floor((todayFocusTime % 3600) / 60)

    return (
        <div className="flex flex-col items-center justify-center mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="text-white/40 text-xs uppercase tracking-widest mb-1">Total Focus Today</span>
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-light text-white/90">
                    {hours}<span className="text-sm text-white/40 ml-0.5 mr-2">h</span>
                    {minutes}<span className="text-sm text-white/40 ml-0.5">m</span>
                </span>
            </div>
        </div>
    )
}
