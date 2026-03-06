import React from 'react';
import LottieBackgroundPanel from '../common/LottieBackgroundPanel';
import { ANIMATIONS } from '../../assets/animations';

export default function AIRecommendations({ recommendations, contentContainerSx={} }) {
  return (
    <LottieBackgroundPanel
      animationData={ANIMATIONS.aiAnimation}
      bulletPoints={recommendations}
      icon={null}
      contentContainerSx={contentContainerSx}
    />
  );
}
