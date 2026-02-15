import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

// Import GIF assets
import aiUiMedGif from '../../assets/AI-UI-med.gif';
import aiUiLargeGif from '../../assets/AI-UI-large.gif';

const Container = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
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

/**
 * A reusable component that displays content with a GIF background
 * @param {Object} props - Component props
 * @param {string} props.size - Size of the panel ('medium' or 'large')
 * @param {Array<string>} props.bulletPoints - List of bullet point text items
 * @param {Object} props.sx - Additional styles for the container
 * @param {Object} props.contentContainerSx - Additional styles for the content container
 */
const GifBackgroundPanel = ({ 
  size = 'medium',
  bulletPoints = [], 
  sx = {},
  contentContainerSx = {},
  imageTransform = null
}) => {
  // Determine which GIF to use based on size
  const isLarge = size === 'large';
  const backgroundGif = isLarge
    ? aiUiLargeGif
    : aiUiMedGif;
    
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
                  sx={{ fontSize: '14px', lineHeight: 1.5, fontWeight: '300' }}
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
