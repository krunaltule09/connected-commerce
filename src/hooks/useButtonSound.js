import { useCallback } from 'react';
import { useSoundContext } from '../context/SoundContext';

/**
 * Custom hook that creates a click handler with sound effect
 * @param {Function} onClick - The original click handler function
 * @param {Object} options - Options for the sound
 * @param {string} options.soundPath - Path to the sound file
 * @param {number} options.volume - Volume level (0-1)
 * @returns {Function} - Enhanced click handler with sound
 */
export const useButtonSound = (onClick, { soundPath = '/assets/sounds/button-click.mp3', volume = 0.5 } = {}) => {
  // Get sound enabled state from context
  const { soundEnabled } = useSoundContext();
  
  // Create a memoized click handler that plays sound and calls the original handler
  const handleClick = useCallback((event) => {
    // Only play sound if enabled in settings
    if (soundEnabled) {
      // Create audio element
      const audio = new Audio(soundPath);
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
  }, [onClick, soundEnabled, soundPath, volume]);
  
  return handleClick;
};
