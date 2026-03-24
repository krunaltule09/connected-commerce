import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useConfig } from '../../context/ConfigContext';

const Container = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
  borderRadius: '8px',
}));



const ContentContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  height: '100%',
  width: '100%',
  padding: theme.spacing(3, 4),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
}));

const BulletPoint = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
}));

const Bullet = styled(Box)(({ theme }) => ({
  color: '#FFFFFF',
  marginRight: theme.spacing(1.5),
  fontSize: '0.75rem',
  lineHeight: 1.8,
  opacity: 0.7,
  marginTop: '3px',
}));

const GifBackgroundPanel = ({ 
  size = 'medium',
  bulletPoints = [], 
  sx = {},
  contentContainerSx = {},
  imageTransform = null
}) => {
  const { assets } = useConfig();
  const isLarge = size === 'large';
  const backgroundGif = isLarge
    ? assets['Banking_Capital_Market_Operate_Table_AI_UI_Large.gif']
    : assets['Banking_Capital_Market_Operate_Table_AI_UI_Medium.gif'];
    
  console.log('GifBackgroundPanel rendering with size:', size);
  console.log('Using background GIF:', backgroundGif);

  return (
    <Container sx={sx}>
      <Box>
        <Box
          component="img"
          src={backgroundGif}
          alt="AI Background"
          sx={{
            width: size=="large"?"90%":'100%',
            height: '100%',
            marginLeft:'-1rem',
            objectFit: 'cover',
            ...(imageTransform ? { transform: imageTransform } : {})
          }}
        />
      </Box>
      
      <ContentContainer sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 1, ...contentContainerSx }}>
        <List disablePadding>
          {bulletPoints.map((point, index) => (
            <ListItem key={index} disableGutters sx={{ p: 0 }}>
              <BulletPoint>
                <Bullet sx={{ lineHeight: 1 }}>▶</Bullet>
                <Typography 
                  variant="body2" 
                  color="white"
                  sx={{ 
                    fontSize: '14px', 
                    lineHeight: 1.5, 
                    fontWeight: '300',
                    fontFamily: 'Interstate, sans-serif',
                    textAlign: 'left'
                  }}
                >
                  {point}
                </Typography>
              </BulletPoint>
            </ListItem>
          ))}
        </List>
      </ContentContainer>
    </Container>
  );
};

export default GifBackgroundPanel;
