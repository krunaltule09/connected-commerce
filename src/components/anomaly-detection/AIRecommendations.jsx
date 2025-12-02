import React from 'react';
import LottieBackgroundPanel from '../common/LottieBackgroundPanel';
import aiAnimationData from '../../lottie/AI- UI.json';

export default function AIRecommendations({ recommendations, contentContainerSx={} }) {
  return (
    <LottieBackgroundPanel
      animationData={aiAnimationData}
      bulletPoints={recommendations}
      icon={null}
      contentContainerSx={contentContainerSx}
    />
  );
}
