 'use client'

import { create } from 'zustand'
import { AudioManager } from '@/lib/audioManager'
import { AudioType } from '@/types/audio'

interface AudioStore {
  currentMusicType: AudioType | null
  isMusicPlaying: boolean
  isAlarmPlaying: boolean
  musicVolume: number
  alarmVolume: number

  musicManagers: Map<AudioType, AudioManager>
  alarmManager: AudioManager | null

  initAudio: () => void
  playMusic: (type: AudioType) => Promise<void>
  stopMusic: () => void
  pauseMusic: () => void
  resumeMusic: () => Promise<void>
  switchMusic: (type: AudioType) => Promise<void>
  playAlarm: () => Promise<void>
  setMusicVolume: (volume: number) => void
  setAlarmVolume: (volume: number) => void
  cleanup: () => void
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  currentMusicType: AudioType.MUTE,
  isMusicPlaying: false,
  isAlarmPlaying: false,
  musicVolume: 0.5,
  alarmVolume: 0.7,
  musicManagers: new Map(),
  alarmManager: null,

  initAudio: () => {
    if (get().alarmManager !== null) return

    const alarm = new AudioManager(AudioType.ALARM)
    alarm.onPlay(() => set({ isAlarmPlaying: true }))
    alarm.onEnded(() => set({ isAlarmPlaying: false }))

    set({ alarmManager: alarm })

    console.log('[AudioStore] Audio initialized')
  },

  // Play the requested music type. If the type is MUTE we stop playback.
  // Managers are created lazily and stored in `musicManagers`.
  playMusic: async (type: AudioType) => {
    const { musicManagers, stopMusic, musicVolume } = get()

    if (type === AudioType.MUTE) {
      stopMusic()
      set({ currentMusicType: AudioType.MUTE })
      console.log('[AudioStore] Music muted')
      return
    }

    // Stop any currently playing music before starting a new one.
    stopMusic()

    // Lazy init manager
    let manager = musicManagers.get(type)

    if (!manager) {
      manager = new AudioManager(type)
      manager.setVolume(musicVolume)

      manager.onPlay(() => {
        set({ isMusicPlaying: true, currentMusicType: type })
      })

      manager.onPause(() => set({ isMusicPlaying: false }))
      manager.onEnded(() => set({ isMusicPlaying: false }))

      musicManagers.set(type, manager)
      set({ musicManagers })

      console.log(`[AudioStore] Created manager for ${type}`)
    }

    try {
      await manager.play()
      console.log(`[AudioStore] Playing ${type}`)
    } catch (error) {
      console.warn(`[AudioStore] Autoplay blocked for ${type}`)
      throw error
    }
  },

  // Stop currently playing music (does not clear the manager map).
  stopMusic: () => {
    const { musicManagers, currentMusicType } = get()

    if (!currentMusicType || currentMusicType === AudioType.MUTE) return

    const manager = musicManagers.get(currentMusicType)
    if (manager) {
      manager.stop()
      console.log(`[AudioStore] Stopped ${currentMusicType}`)
    }

    set({ isMusicPlaying: false })
    // Keep `currentMusicType` so we can resume if desired later.
  },
  
  // ========================================
  // PAUSE MUSIC (Preserve currentTime)
  // ========================================
  pauseMusic: () => {
    const { musicManagers, currentMusicType } = get()
    
    if (!currentMusicType || currentMusicType === AudioType.MUTE) return
    
    const manager = musicManagers.get(currentMusicType)
    if (manager && manager.isPlaying()) {
      manager.pause()
      console.log(`[AudioStore] Paused ${currentMusicType}`)
    }
    
    set({ isMusicPlaying: false })
  },
  
  // ========================================
  // RESUME MUSIC (Continue from pause)
  // ========================================
  resumeMusic: async () => {
    const { musicManagers, currentMusicType } = get()
    
    if (!currentMusicType || currentMusicType === AudioType.MUTE) {
      console.warn('[AudioStore] No music to resume (mute or null)')
      return
    }
    
    const manager = musicManagers.get(currentMusicType)
    
    if (!manager) {
      console.warn(`[AudioStore] Manager not found for ${currentMusicType}`)
      return
    }
    
    try {
      await manager.resume()
      console.log(`[AudioStore] Resumed ${currentMusicType}`)
      set({ isMusicPlaying: true })
    } catch (error) {
      console.warn(`[AudioStore] Resume blocked for ${currentMusicType}`)
      throw error
    }
  },
  
  // ========================================
  // SWITCH MUSIC (Stop old, play new)
  // ========================================
  switchMusic: async (type: AudioType) => {
    const { playMusic } = get()
    await playMusic(type)
  },
  
  playAlarm: async () => {
    const { alarmManager, stopMusic } = get()
    
    if (!alarmManager) {
      console.warn('[AudioStore] Alarm manager not initialized')
      return
    }
    
    stopMusic()
    
    try {
      await alarmManager.play()
      console.log('[AudioStore] Alarm playing')
    } catch (error) {
      console.warn('[AudioStore] Alarm play blocked')
    }
  },
  
  setMusicVolume: (volume: number) => {
    const { musicManagers } = get()
    
    musicManagers.forEach(manager => {
      manager.setVolume(volume)
    })
    
    set({ musicVolume: volume })
  },
  
  setAlarmVolume: (volume: number) => {
    const { alarmManager } = get()
    
    if (alarmManager) {
      alarmManager.setVolume(volume)
    }
    
    set({ alarmVolume: volume })
  },
  
  cleanup: () => {
    const { musicManagers, alarmManager } = get()
    
    musicManagers.forEach(manager => manager.cleanup())
    alarmManager?.cleanup()
    
    set({ 
      musicManagers: new Map(),
      alarmManager: null,
      currentMusicType: AudioType.MUTE,
      isMusicPlaying: false,
      isAlarmPlaying: false
    })
    
    console.log('[AudioStore] Cleanup complete')
  },
}))