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

export const withButtonSound = (onClick, options = {}) => {
  return (event) => {
    playButtonSound(options);
    if (onClick) {
      onClick(event);
    }
  };
};
