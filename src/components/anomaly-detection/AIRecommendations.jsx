import React, { useState, useEffect } from 'react';
import LottieBackgroundPanel from '../common/LottieBackgroundPanel';
import { ANNIMATIONS } from '../../data/assetPaths';

export default function AIRecommendations({ recommendations, contentContainerSx={} }) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(ANNIMATIONS.AI_ANIMATION_LOTTIE)
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error('Failed to load AI animation:', err));
  }, []);

  if (!animationData) return null;

  return (
    <LottieBackgroundPanel
      animationData={animationData}
      bulletPoints={recommendations}
      icon={null}
      contentContainerSx={contentContainerSx}
    />
  );
}
