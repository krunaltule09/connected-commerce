import React from 'react';
import GifBackgroundPanel from '../common/GifBackgroundPanel';

/**
 * AIRecommendations component that displays recommendations with a GIF background
 * @param {Object} props - Component props
 * @param {Array<string>} props.recommendations - List of AI recommendations
 * @param {string} props.size - Size of the panel ('medium' or 'large')
 * @param {Object} props.contentContainerSx - Additional styles for the content container
 */
export default function AIRecommendationsWithGif({ 
  recommendations, 
  size = 'medium',
  contentContainerSx = {},
  imageTransform = null
}) {
  console.log('AIRecommendationsWithGif size:', size);
  
  return (
    <GifBackgroundPanel
      size={size}
      bulletPoints={recommendations}
      contentContainerSx={contentContainerSx}
      sx={{ height: '100%', width: '100%' }}
      imageTransform={imageTransform}
    />
  );
}
