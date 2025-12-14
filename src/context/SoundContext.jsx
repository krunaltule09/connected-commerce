import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const SoundContext = createContext({
  soundEnabled: true,
  toggleSound: () => {},
});

/**
 * Provider component for sound settings
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const SoundProvider = ({ children }) => {
  // Initialize sound state from localStorage or default to true
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const savedSetting = localStorage.getItem('soundEnabled');
    return savedSetting !== null ? JSON.parse(savedSetting) : true;
  });

  // Update localStorage when sound setting changes
  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Toggle sound on/off
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  // Preload the button click sound
  useEffect(() => {
    const audio = new Audio('/assets/sounds/button-click.mp3');
    audio.preload = 'auto';
    
    // Just trigger the load but don't play
    audio.load();
    
    return () => {
      audio.remove();
    };
  }, []);

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
};

/**
 * Custom hook to access sound context
 * @returns {Object} Sound context value
 */
export const useSoundContext = () => useContext(SoundContext);

export default SoundContext;
