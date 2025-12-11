// src/lib/audioManager.ts

import { AudioType, AUDIO_CONFIGS } from '@/types/audio'
export class AudioManager {
  private audio: HTMLAudioElement
  private type: AudioType
  private onPlayCallback?: () => void
  private onPauseCallback?: () => void
  private onEndedCallback?: () => void
  
  constructor(type: AudioType) {
    this.type = type
    const config = AUDIO_CONFIGS[type]
    
    this.audio = new Audio(config.src)
    this.audio.loop = config.loop
    this.audio.volume = config.volume
    
    this.setupListeners()
  }
  
  //setup event listeners
  private setupListeners() {
    this.audio.addEventListener('play', () => {
      this.onPlayCallback?.()
    })
    
    this.audio.addEventListener('pause', () => {
      this.onPauseCallback?.()
    })
    
    this.audio.addEventListener('ended', () => {
      this.onEndedCallback?.()
    })
  }
  
  //public method
  async play(): Promise<void> {
    try {
      this.audio.currentTime = 0
      await this.audio.play()
    } catch (error) {
      console.warn(`[AudioManager] Play blocked for ${this.type}:`, error)
      throw error  
    }
  }
  
  stop(): void {
    this.audio.pause()
    this.audio.currentTime = 0
  }
  
  pause(): void {
    this.audio.pause()
    // TIDAK reset currentTime (preserve position)
  }

  async resume(): Promise<void> {
    try {
      // Continue dari currentTime yang tersimpan
      await this.audio.play()
    } catch (error) {
      console.warn(`[AudioManager] Resume failed for ${this.type}:`, error)
      throw error
    }
  }
  
  setVolume(volume: number): void {
    // Clamp ke 0-1
    this.audio.volume = Math.max(0, Math.min(1, volume))
  }
  
  getVolume(): number {
    return this.audio.volume
  }
  
  isPlaying(): boolean {
    return !this.audio.paused
  }
  
  getCurrentTime(): number {
    return this.audio.currentTime
  }
  
  getDuration(): number {
    return this.audio.duration
  }
  
  //callback for ui state
  onPlay(callback: () => void): void {
    this.onPlayCallback = callback
  }
  
  onPause(callback: () => void): void {
    this.onPauseCallback = callback
  }
  
  onEnded(callback: () => void): void {
    this.onEndedCallback = callback
  }
  
  cleanup(): void {
    this.audio.pause()
    this.audio.src = '' 
  }
}