import { useCallback } from 'react';
import { useSoundContext } from '../context/SoundContext';
import { useConfig } from '../context/ConfigContext';

export const useButtonSound = (onClick, { soundPath, volume = 0.5 } = {}) => {
  const { assets } = useConfig();
  const path = soundPath ?? assets['BCM_OperateTable_Button_Click.mp3'];
  // Get sound enabled state from context
  const { soundEnabled } = useSoundContext();
  
  const handleClick = useCallback((event) => {
    if (soundEnabled) {
      const audio = new Audio(path);
      audio.volume = volume;
      
      // Play the sound
      const playPromise = audio.play();
      
      // Handle potential play() promise rejection (browsers may block autoplay)
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Audio playback was prevented:', error);
        });
      }
    }
    
    // Call the original click handler if provided
    if (onClick) {
      onClick(event);
    }
  }, [onClick, soundEnabled, path, volume]);
  
  return handleClick;
};
