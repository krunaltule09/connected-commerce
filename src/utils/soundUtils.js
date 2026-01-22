/**
 * Utility functions for sound effects
 */
import buttonClickSound from '../assets/sounds/button-click.mp3';

/**
 * Plays a button click sound
 * @param {Object} options - Options for the sound
 * @param {string} options.soundPath - Path to the sound file
 * @param {number} options.volume - Volume level (0-1)
 */
export const playButtonSound = ({ soundPath = buttonClickSound, volume = 0.5 } = {}) => {
  try {
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
  } catch (error) {
    console.error('Failed to play sound:', error);
  }
};

/**
 * Creates a click handler with sound
 * @param {Function} onClick - Original click handler
 * @param {Object} options - Options for the sound
 * @returns {Function} - Enhanced click handler with sound
 */
export const withButtonSound = (onClick, options = {}) => {
  return (event) => {
    playButtonSound(options);
    if (onClick) {
      onClick(event);
    }
  };
};
