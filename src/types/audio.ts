// src/types/audio.ts
export enum AudioType {
  MUTE = 'mute',
  LOFI = 'lofi',
  EPIC_SCORE = 'epic-score',
  PHONK = 'phonk',
  ALARM = 'alarm',
}
export interface AudioConfig {
  src: string
  loop: boolean
  volume: number
  category: 'music' | 'sfx' | 'none'
  displayName: string  
  emoji: string        
}

export const AUDIO_CONFIGS: Record<AudioType, AudioConfig> = {
    [AudioType.MUTE]: {
    src: '',
    loop: false,
    volume: 0,
    category: 'none',
    displayName: 'Mute',
    emoji: '🔇',
  },
    
  [AudioType.LOFI]: {
    src: '/sounds/lofi.mp3',
    loop: true,
    volume: 0.5,
    category: 'music',
    displayName: 'Lofi',
    emoji: '🎵',
  },
  
  [AudioType.EPIC_SCORE]: {
    src: '/sounds/score.mp3',
    loop: true,
    volume: 0.6,
    category: 'music',
    displayName: 'Epic Score',
    emoji: '🎬',
  },
  
  [AudioType.PHONK]: {
    src: '/sounds/phonk.mp3',
    loop: true,
    volume: 0.5,
    category: 'music',
    displayName: 'Phonk',
    emoji: '🔥',
  },
  
  [AudioType.ALARM]: {
    src: '/sounds/alarm.mp3',
    loop: false,
    volume: 0.7,
    category: 'sfx',
    displayName: 'Alarm',
    emoji: '🔔',
  },
}

export function getMusicOptions(): AudioType[] {
  return Object.entries(AUDIO_CONFIGS)
    .filter(([_, config]) => config.category === 'music' || config.category === 'none')
    .map(([type, _]) => type as AudioType)
}