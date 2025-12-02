import React from 'react';
import { Button } from '@mui/material';

/**
 * A reusable button component that matches the styling from FinancialMetricsSection
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant: 'primary' (green), 'secondary' (yellow), or 'metric' (background image)
 * @param {boolean} props.active - Whether the button is active/selected
 * @param {React.ReactNode} props.children - Button content
 * @param {Object} props.sx - Additional styles
 * @param {Function} props.onClick - Click handler
 * @param {Object} props.rest - Additional props
 */
const GradientButton = ({ 
  variant = 'default', 
  active = false, 
  children, 
  sx = {}, 
  onClick,
  ...rest 
}) => {
  // Determine button styles based on variant and active state
  const getButtonStyles = () => {
    // Base styles for all buttons
    const baseStyles = {
      color: '#FCFCFC',
      border: 'none',
      backgroundColor: 'transparent',
      textTransform: 'none',
      fontSize: '0.85rem',
      padding: '12px 16px',
      justifyContent: 'flex-start',
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
    };

    // Variant-specific styles
    switch (variant) {
      case 'metric': // Background image style from FinancialMetricsSection
        return {
          ...baseStyles,
          backgroundImage: active 
            ? `url('${process.env.PUBLIC_URL}/assets/Group%204.svg')`
            : `url('${process.env.PUBLIC_URL}/assets/Group%20554.svg')`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '55px',
          '&:hover': {
            backgroundImage: active
              ? `url('${process.env.PUBLIC_URL}/assets/Group%204.svg')`
              : `url('${process.env.PUBLIC_URL}/assets/Group%20554.svg')`,
            outline: 'none',
            border: 'none',
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

      onClick={onClick}
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
