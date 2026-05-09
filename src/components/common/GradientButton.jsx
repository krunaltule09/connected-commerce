import React from 'react';
import { Button } from '@mui/material';
import { useSound } from '../../hooks';
import { useConfig } from '../../context/ConfigContext';

const GradientButton = ({ 
  variant = 'default', 
  active = false, 
  children, 
  sx = {}, 
  onClick,
  soundPath,
  ...rest 
}) => {
  const { assets } = useConfig();
  const path = soundPath ?? assets['Banking_Capital_Market_Operate_Table_Button_Click.mp3'];
  const playSound = useSound(path, { volume: 0.5 });
  
  // Handle click with sound
  const handleClick = (event) => {
    playSound();
    if (onClick) {
      onClick(event);
    }
  };
  // Determine button styles based on variant and active state
  const getButtonStyles = () => {
    // Base styles for all buttons
    const baseStyles = {
      color: '#FCFCFC',
      border: 'none',
      backgroundColor: 'transparent',
      textTransform: 'none',
      fontSize: '0.85rem', // Standard font size
      padding: '12px 16px',
      justifyContent: 'flex-start',
      textAlign: 'left',
      position: 'relative',
      '&:hover': {
        outline: 'none',
        border: 'none',
      },
      '&:focus': {
        outline: 'none',
        border: 'none',
      },
      boxShadow: 'none',
      marginBottom: '8px',
    };

    // Variant-specific styles
    switch (variant) {
      case 'metric': // Background image style from FinancialMetricsSection
        return {
          ...baseStyles,
          background: active
            ? 'linear-gradient(135deg, rgba(255, 230, 0, 0.25) 0%, rgba(255, 230, 0, 0.08) 100%)'
            : 'rgba(46, 46, 56, 0.6)',
          border: active ? '1px solid #FFE600' : '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '8px',
          width: '140px',
          maxWidth: '140px',
          minWidth: '140px',
          height: '50px',
          minHeight: '50px',
          maxHeight: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: {
            xs: '0.5rem 0.7rem',
            sm: '0.6rem 0.9rem',
            md: '0.7rem 1rem'
          },
          fontSize: '0.85rem',
          lineHeight: 1.2,
          whiteSpace: 'inherit',
          wordBreak: 'normal',
          textAlign: 'center',
          transition: 'background 0.2s ease, border-color 0.2s ease',
          '&:hover': {
            background: active
              ? 'linear-gradient(135deg, rgba(255, 230, 0, 0.3) 0%, rgba(255, 230, 0, 0.12) 100%)'
              : 'rgba(46, 46, 56, 0.8)',
            border: active ? '1px solid #FFE600' : '1px solid rgba(255, 255, 255, 0.25)',
            outline: 'none',
            boxShadow: 'none',
          },
        };
      case 'primary': // Green style
        return {
          ...baseStyles,
          backgroundColor: active ? '#B4FF00' : 'rgba(29, 29, 29, 0.8)',
          color: active ? '#000000' : '#FFFFFF',
          borderRadius: '20px',
          '&:hover': {
            backgroundColor: active ? '#B4FF00' : 'rgba(180, 255, 0, 0.1)',
            outline: 'none',
            border: 'none',
            boxShadow: 'none',
          },
        };
      case 'secondary': // Yellow style
        return {
          ...baseStyles,
          backgroundColor: active ? '#FFEB3B' : 'rgba(29, 29, 29, 0.8)',
          color: active ? '#000000' : '#FFFFFF',
          borderRadius: '20px',
          '&:hover': {
            backgroundColor: active ? '#FFEB3B' : 'rgba(255, 235, 59, 0.1)',
            outline: 'none',
            border: 'none',
            boxShadow: 'none',
          },
        };
      default: // Default dark style
        return {
          ...baseStyles,
          backgroundColor: 'rgba(29, 29, 29, 0.8)',
          color: '#FFFFFF',
          borderRadius: '20px',
          '&:hover': {
            backgroundColor: 'rgba(29, 29, 29, 0.9)',
            outline: 'none',
            border: 'none',
            boxShadow: 'none',
          },
        };
    }
  };

  return (
    <Button
      onClick={handleClick}
      sx={{
        ...getButtonStyles(),
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default GradientButton;
