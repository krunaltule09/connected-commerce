import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useConfig } from '../context/ConfigContext';

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
  transitionDelay: '0.3s',
  '&.visible': {
    opacity: 1,
    transform: 'translateY(0)',
  }
}));

const RatingComponentSvg = ({ isVisible }) => {
  const { assets } = useConfig();
  return (
    <SvgContainer className={isVisible ? 'visible' : ''}>
      <Box 
        component="img" 
        src={assets['Banking_Capital_Market_Operate_Table_Rating_Frame.svg']}
        alt="Rate Us" 
        sx={{ width: '200px', height: 'auto' }}
      />
    </SvgContainer>
  );
};

export default RatingComponentSvg;
