
'use client'

import { useAudioStore } from "@/store/useAudioStore"
import { AudioType, AUDIO_CONFIGS, getMusicOptions } from "@/types/audio"

export default function MusicSelector() {
  const currentMusicType = useAudioStore(state => state.currentMusicType)
  const trackInfo = useAudioStore(state => state.currentTrackInfo)
  const swicthMusic = useAudioStore(state => state.switchMusic)
  const musicOptions = getMusicOptions()

  const handleMusicChange = async (type: AudioType) => {
    if (type === currentMusicType) return

    if (type === AudioType.MUTE) {
      await swicthMusic(type)
      return
    }

    try {
      await swicthMusic(type)
    } catch (error) {
      alert('Audio autoplay blocked by browser. Click the button again to enable sound.')
    }
  }
  return (
    <div className="mb-6">
      <div className="text-center mb-3">
        <p className="text-sm text-white/60 font-medium">Focus Music</p>
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
        {musicOptions.map((type) => {
          const config = AUDIO_CONFIGS[type]
          const isActive = currentMusicType === type

          return (
            <button
              key={type}
              onClick={() => handleMusicChange(type)}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm
                transition-all duration-200
                ${isActive
                  ? 'bg-white/10 text-white ring-1 ring-white/30 shadow-sm scale-105'
                  : 'bg-transparent text-white/40 hover:text-white/80 hover:bg-white/5 hover:scale-102'
                }
              `}
            >
              <span className="mr-1.5">{config.emoji}</span>
              {config.displayName}
            </button>
          )
        })}
      </div>

      {
        currentMusicType && currentMusicType !== AudioType.MUTE && (
          <div className="text-center mt-3 flex flex-col items-center gap-1">
            <p className="text-xs text-white/40">
              Now playing: {AUDIO_CONFIGS[currentMusicType].displayName}
            </p>
            {trackInfo && (
              <p className="text-xs text-white/60 font-medium animate-pulse">
                🎵 {trackInfo.title} <span className="text-white/40">by {trackInfo.artist}</span>
              </p>
            )}
          </div>
        )
      }
    </div >
  )
}