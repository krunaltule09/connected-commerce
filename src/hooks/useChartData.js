import { useState, useEffect, useMemo } from 'react';

export const useChartData = (data, isReady, metricKey) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  
  // Reset animation when metric changes or data becomes ready
  useEffect(() => {
    setAnimationProgress(0);
  }, [metricKey, isReady]);
  
  // Progressive animation effect
  useEffect(() => {
    if (!isReady) return;
    
    let animationFrame;
    const startTime = Date.now();
    const duration = 2000; // 2 seconds for full animation
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setAnimationProgress(progress);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isReady, metricKey]);
  
  // Return full data immediately — let Chart.js handle bar animation
  const calculateVisibleData = useMemo(() => {
    return data.map(item => item[1]);
  }, [data]);
  
  // Extract labels from data
  const labels = useMemo(() => data.map(item => item[0]), [data]);
  
  return {
    animationProgress,
    visibleData: calculateVisibleData,
    labels,
    isAnimating: animationProgress < 1
  };
};
