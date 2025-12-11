//src/components/MusicSelector.tsx
'use client'

import { useAudioStore } from "@/store/useAudioStore"
import { AudioType,AUDIO_CONFIGS,getMusicOptions } from "@/types/audio"

export default function MusicSelector(){
    const currentMusicType = useAudioStore(state => state.currentMusicType )
    const swicthMusic = useAudioStore(state => state.switchMusic)
    const musicOptions = getMusicOptions()
    //music handling
    const handleMusicChange = async ( type: AudioType) => {
        if (type === currentMusicType) return
        
        if(type === AudioType.MUTE){
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
      {/* Label*/}
      <div className="text-center mb-3">
        <p className="text-sm text-white/60 font-medium">Focus Music</p>
      </div>
      
      {/*Music buttons*/}
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
                  ? 'bg-white text-gray-900 shadow-lg scale-105'
                  : 'bg-white/20 text-white/80 hover:bg-white/30 hover:scale-102'
                }
              `}
            >
              <span className="mr-1.5">{config.emoji}</span>
              {config.displayName}
            </button>
          )
        })}
      </div>
      
      {/*Current selection indicator*/}
      {currentMusicType && currentMusicType !== AudioType.MUTE && (
        <div className="text-center mt-3">
          <p className="text-xs text-white/40">
            Now playing: {AUDIO_CONFIGS[currentMusicType].displayName}
          </p>
        </div>
      )}
    </div>
  )
}