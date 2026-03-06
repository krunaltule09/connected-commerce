/**
 * Utility functions for sound effects
 */

/**
 * Plays a button click sound
 * @param {Object} options - Options for the sound
 * @param {string} options.soundPath - Path to the sound file (defaults to button click if not provided)
 * @param {number} options.volume - Volume level (0-1)
 * @param {Object} options.assets - Assets map from config
 */
export const playButtonSound = ({ soundPath, volume = 0.5, assets } = {}) => {
  const a = assets || {};
  const path = soundPath ?? a['BCM_OperateTable_Button_Click.mp3'];
  try {
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
