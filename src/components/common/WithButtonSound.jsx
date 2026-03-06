import React from 'react';
import { useSound } from '../../hooks';
import { useConfig } from '../../context/ConfigContext';

/**
 * Higher-order component that adds a click sound to any component
 * @param {React.ComponentType} Component - The component to wrap
 * @param {string} soundPath - Path to the sound file (uses config assets if not provided)
 * @returns {React.ComponentType} - The wrapped component with sound
 */
const WithButtonSound = (Component, defaultSoundPath) => {
  const WrappedComponent = React.forwardRef((props, ref) => {
    const { assets } = useConfig();
    const soundPath = defaultSoundPath ?? assets['BCM_OperateTable_Button_Click.mp3'];
    const playSound = useSound(soundPath, { volume: 0.5 });
    
    const handleClick = (event) => {
      playSound();
      if (props.onClick) {
        props.onClick(event);
      }
    };
    
    return <Component {...props} onClick={handleClick} ref={ref} />;
  });
  
  WrappedComponent.displayName = `WithButtonSound(${Component.displayName || Component.name || 'Component'})`;
  
  return WrappedComponent;
};

/**
 * Custom hook to create a click handler with sound
 * @param {Function} onClick - Original click handler
 * @param {string} soundPath - Path to the sound file
 * @returns {Function} - Enhanced click handler with sound
 */
export const useSoundClick = (onClick, soundPath) => {
  const { assets } = useConfig();
  const path = soundPath ?? assets['BCM_OperateTable_Button_Click.mp3'];
  const playSound = useSound(path, { volume: 0.5 });
  
  return React.useCallback((event) => {
    playSound();
    if (onClick) {
      onClick(event);
    }
  }, [onClick, playSound]);
};

/**
 * Apply sound to any clickable element that has an onClick handler
 * This is a component that should be used inside a React component
 * @param {React.ReactElement} element - The React element to enhance with sound
 * @param {string} soundPath - Path to the sound file (optional, uses config assets if not provided)
 * @returns {React.ReactElement} - Enhanced element with sound
 */
export const SoundButton = ({ element, soundPath }) => {
  const onClick = element?.props?.onClick;
  const soundClickHandler = useSoundClick(onClick, soundPath);
  
  if (!element || !element.props) {
    return element;
  }
  
  return React.cloneElement(element, {
    ...element.props,
    onClick: soundClickHandler
  });
};

export default WithButtonSound;
