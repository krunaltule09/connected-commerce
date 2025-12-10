import { useState, useEffect, useMemo } from 'react';

/**
 * Custom hook for processing and animating chart data
 * 
 * @param {Array} data - Raw data array for the chart
 * @param {boolean} isReady - Whether the data is ready to be displayed
 * @param {string} metricKey - The key for the current metric (used for re-animation)
 * @returns {Object} - Processed chart data and animation state
 */
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
  
  // Calculate visible data points based on animation progress
  const calculateVisibleData = useMemo(() => {
    const fullData = data.map(item => item[1]);
    const visibleCount = Math.ceil(fullData.length * animationProgress);
    return fullData.map((value, index) => index < visibleCount ? value : 0);
  }, [data, animationProgress]);
  
  // Extract labels from data
  const labels = useMemo(() => data.map(item => item[0]), [data]);
  
  return {
    animationProgress,
    visibleData: calculateVisibleData,
    labels,
    isAnimating: animationProgress < 1
  };
};
