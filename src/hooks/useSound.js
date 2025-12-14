import { useCallback, useEffect, useRef } from 'react';
import { useSoundContext } from '../context/SoundContext';

/**
 * Custom hook for playing sounds
 * @param {string} soundPath - Path to the sound file
 * @param {Object} options - Additional options
 * @param {number} options.volume - Volume level (0-1)
 * @param {boolean} options.preload - Whether to preload the sound
 * @returns {Function} - Function to play the sound
 */
const useSound = (soundPath, { volume = 1, preload = true } = {}) => {
  const audioRef = useRef(null);
  const { soundEnabled } = useSoundContext();

  useEffect(() => {
    if (preload) {
      audioRef.current = new Audio(soundPath);
      audioRef.current.volume = volume;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundPath, volume, preload]);

  const play = useCallback(() => {
    // Don't play sound if sound is disabled
    if (!soundEnabled) return;
    
    if (!audioRef.current && !preload) {
      audioRef.current = new Audio(soundPath);
      audioRef.current.volume = volume;
    }

    if (audioRef.current) {
      // Reset the audio to start position if it's already playing
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      
      // Play the sound
      const playPromise = audioRef.current.play();
      
      // Handle potential play() promise rejection (browsers may block autoplay)
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Audio playback was prevented:', error);
        });
      }
    }
  }, [soundPath, volume, preload, soundEnabled]);

  return play;
};

export default useSound;
