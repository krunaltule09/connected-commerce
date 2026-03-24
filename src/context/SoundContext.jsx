import React, { createContext, useContext, useState, useEffect } from 'react';
import { useConfig } from './ConfigContext';

// Create context
const SoundContext = createContext({
  soundEnabled: true,
  toggleSound: () => {},
});

export const SoundProvider = ({ children }) => {
  const { assets } = useConfig();
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
    const audio = new Audio(assets['Banking_Capital_Market_Operate_Table_Button_Click.mp3']);
    audio.preload = 'auto';
    
    // Just trigger the load but don't play
    audio.load();
    
    return () => {
      audio.remove();
    };
  }, [assets]);

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => useContext(SoundContext);

export default SoundContext;
