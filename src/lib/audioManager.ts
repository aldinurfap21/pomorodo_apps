import { AudioType, AUDIO_CONFIGS, AudioConfig } from '@/types/audio'

export class AudioManager {
  private audio: HTMLAudioElement
  private type: AudioType
  private currentTrackIndex: number = 0
  private config: AudioConfig

  private onPlayCallback?: () => void
  private onPauseCallback?: () => void
  private onEndedCallback?: () => void
  private onTrackChangeCallback?: () => void

  constructor(type: AudioType, customUrl?: string) {
    this.type = type
    this.config = AUDIO_CONFIGS[type]
    let source = ''
    if (customUrl) {
      source = customUrl
    } else if (this.config.playlist && this.config.playlist.length > 0) {
      source = this.config.playlist[0].src
      this.currentTrackIndex = 0
    } else {
      source = this.config.src || ''
    }

    this.audio = new Audio(source)
    this.audio.loop = this.config.loop
    this.audio.volume = this.config.volume

    this.setupListeners()
  }

  private setupListeners() {
    this.audio.addEventListener('play', () => {
      this.onPlayCallback?.()
    })

    this.audio.addEventListener('pause', () => {
      this.onPauseCallback?.()
    })

    this.audio.addEventListener('ended', () => {
      this.handleTrackEnd()
      this.onEndedCallback?.()
    })
  }

  private handleTrackEnd() {

    if (this.config.playlist && this.config.playlist.length > 0) {
      const nextIndex = this.currentTrackIndex + 1

      if (nextIndex < this.config.playlist.length) {

        this.playTrackAtIndex(nextIndex)
      } else {

        if (this.config.loop) {

          this.playTrackAtIndex(0)
        } else {

          this.stop()
        }
      }
    }
  }

  private async playTrackAtIndex(index: number) {
    if (!this.config.playlist) return

    this.currentTrackIndex = index
    const track = this.config.playlist[index]


    this.audio.src = track.src
    this.audio.load()
    this.onTrackChangeCallback?.()

    try {
      await this.audio.play()
    } catch (error) {
      console.warn(`[AudioManager] Auto-play blocked for track ${index}:`, error)
    }
  }



  async play(): Promise<void> {
    try {
      if (!this.audio.src) {

        if (this.config.playlist) {
          this.audio.src = this.config.playlist[0].src
        } else if (this.config.src) {
          this.audio.src = this.config.src
        }
      }
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
  }

  async resume(): Promise<void> {
    try {
      await this.audio.play()
    } catch (error) {
      console.warn(`[AudioManager] Resume failed for ${this.type}:`, error)
      throw error
    }
  }

  setVolume(volume: number): void {
    this.audio.volume = Math.max(0, Math.min(1, volume))
  }

  getVolume(): number {
    return this.audio.volume
  }

  isPlaying(): boolean {
    return !this.audio.paused
  }

  getCurrentTrackInfo() {
    if (this.config.playlist && this.config.playlist.length > 0) {
      return this.config.playlist[this.currentTrackIndex]
    }
    return null
  }

  onPlay(callback: () => void): void {
    this.onPlayCallback = callback
  }

  onPause(callback: () => void): void {
    this.onPauseCallback = callback
  }

  onEnded(callback: () => void): void {
    this.onEndedCallback = callback
  }

  onTrackChange(callback: () => void): void {
    this.onTrackChangeCallback = callback
  }

  cleanup(): void {
    this.audio.pause()
    this.audio.src = ''
    this.onPlayCallback = undefined
    this.onPauseCallback = undefined
    this.onEndedCallback = undefined
    this.onTrackChangeCallback = undefined
  }
}