import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const SvgContainer = styled(Box)(({ theme }) => ({
  borderRadius: '12px',
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  opacity: 0,
  transform: 'translateY(20px)',
  transition: 'opacity 1s ease-in-out, transform 1s ease-out',
  '&.visible': {
    opacity: 1,
    transform: 'translateY(0)',
  }
}));

const DeliveryOptionsSvg = ({ isVisible }) => {
  return (
    <SvgContainer className={isVisible ? 'visible' : ''}>
      <Box 
        component="img" 
        src="/assets/QR.svg" 
        alt="Delivery Options" 
        sx={{ width: '200px', height: 'auto' }}
      />
    </SvgContainer>
  );
};

export default DeliveryOptionsSvg;
