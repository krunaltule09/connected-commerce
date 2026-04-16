import React from 'react';
import GifBackgroundPanel from '../common/GifBackgroundPanel';

export default function AIRecommendationsWithGif({ 
  recommendations, 
  size = 'medium',
  contentContainerSx = {},
  imageTransform = null,
  fontSize = '14px'
}) {
  console.log('AIRecommendationsWithGif size:', size);
  
  return (
    <GifBackgroundPanel
      size={size}
      bulletPoints={recommendations}
      contentContainerSx={contentContainerSx}
      sx={{ height: '100%', width: '100%' }}
      imageTransform={imageTransform}
      fontSize={fontSize}
    />
  );
}
