import React from 'react';
import { useSound } from '../../hooks';
import { useConfig } from '../../context/ConfigContext';

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
