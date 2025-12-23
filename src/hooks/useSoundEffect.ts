
import { useEffect, useRef, useCallback } from 'react'
import { UI_CONFIG } from '@/config/appConfig'

export function useSoundEffect(src: string, volume: number = UI_CONFIG.DEFAULT_VOLUME.SFX) {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        const audio = new Audio(src)
        audio.volume = volume
        audioRef.current = audio

        return () => {
            audio.pause()
            audio.src = ''
            audioRef.current = null
        }
    }, [src, volume])

    const play = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play().catch(error => {
                console.warn('Sound effect play blocked', error)
            })
        }
    }, [])

    return play
}
