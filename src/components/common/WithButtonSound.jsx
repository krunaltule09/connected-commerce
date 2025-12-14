import React from 'react';
import { useSound } from '../../hooks';

/**
 * Higher-order component that adds a click sound to any component
 * @param {React.ComponentType} Component - The component to wrap
 * @param {string} soundPath - Path to the sound file
 * @returns {React.ComponentType} - The wrapped component with sound
 */
const WithButtonSound = (Component, soundPath = '/assets/sounds/button-click.mp3') => {
  const WrappedComponent = React.forwardRef((props, ref) => {
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
export const useSoundClick = (onClick, soundPath = '/assets/sounds/button-click.mp3') => {
  const playSound = useSound(soundPath, { volume: 0.5 });
  
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
 * @param {string} soundPath - Path to the sound file (optional)
 * @returns {React.ReactElement} - Enhanced element with sound
 */
export const SoundButton = ({ element, soundPath = '/assets/sounds/button-click.mp3' }) => {
  // Always call hooks at the top level, before any conditional logic
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
