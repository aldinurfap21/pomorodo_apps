
export enum AudioType {
  MUTE = 'mute',
  LOFI = 'lofi',
  EPIC_SCORE = 'epic-score',
  PHONK = 'phonk',
  ALARM = 'alarm',
}
export interface AudioTrack {
  src: string
  title: string
  artist: string
  source: string
}

export interface AudioConfig {
  src?: string
  playlist?: AudioTrack[]
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

    playlist: [
      { src: '/song/lofi/lofi1.mp3', title: 'Bread', artist: 'Lukrembo', source: 'https://freetouse.com/music' },
      { src: '/song/lofi/lofi2.mp3', title: 'This Is For You', artist: 'Lukrembo', source: 'https://freetouse.com/music' },
      { src: '/song/lofi/lofi3.mp3', title: 'This Is For You', artist: 'Lukrembo', source: 'https://freetouse.com/music' },
      { src: '/song/lofi/lofi4.mp3', title: 'Vibing', artist: 'Pufino', source: 'https://freetouse.com/music' },
      { src: '/song/lofi/lofi5.mp3', title: 'Vibing', artist: 'Pufino', source: 'https://freetouse.com/music' },
    ],
    loop: true,
    volume: 0.5,
    category: 'music',
    displayName: 'Lofi',
    emoji: '🎵',
  },

  [AudioType.EPIC_SCORE]: {
    playlist: [
      { src: '/song/score/score1.mp3', title: 'Cinematic', artist: 'Aylex', source: 'https://freetouse.com/music' },
      { src: '/song/score/score2.mp3', title: 'Heroes', artist: 'Sunova', source: 'https://freetouse.com/music' },
      { src: '/song/score/score3.mp3', title: 'Glorious', artist: 'Aylex', source: 'https://freetouse.com/music' },
      { src: '/song/score/score4.mp3', title: 'Travelling', artist: 'Aylex', source: 'https://freetouse.com/music' },
      { src: '/song/score/score5.mp3', title: 'Castle', artist: 'Walen', source: 'https://freetouse.com/music' },
    ],
    loop: true,
    volume: 0.6,
    category: 'music',
    displayName: 'Epic Score',
    emoji: '🎬',
  },

  [AudioType.PHONK]: {
    playlist: [
      { src: '/song/phonk/phonk1.mp3', title: 'Drifting', artist: 'VTEMO', source: 'https://freetouse.com/music' },
      { src: '/song/phonk/phonk2.mp3', title: 'HEADPHONK', artist: 'Walen', source: 'https://freetouse.com/music' },
      { src: '/song/phonk/phonk3.mp3', title: 'This Is Phonk', artist: 'Aylex', source: 'https://freetouse.com/music' },
      { src: '/song/phonk/phonk4.mp3', title: 'LOUD', artist: 'Aylex', source: 'https://freetouse.com/music' },
      { src: '/song/phonk/phonk5.mp3', title: 'Brazilian Hype', artist: 'Walen', source: 'https://freetouse.com/music' },
    ],
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