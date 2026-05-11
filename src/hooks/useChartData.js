import { useState, useEffect, useMemo } from 'react';

export const useChartData = (data, isReady, metricKey) => {
  const [showData, setShowData] = useState(false);

  // Reset to zeros on metric change, then reveal after a brief delay
  // so Chart.js animates from 0 → real values (bottom-to-top grow)
  useEffect(() => {
    setShowData(false);
    if (!isReady) return;

    const timer = setTimeout(() => setShowData(true), 50);
    return () => clearTimeout(timer);
  }, [metricKey, isReady]);

  // Return zeros initially, then real data after delay
  const visibleData = useMemo(() => {
    if (!showData) return data.map(() => 0);
    return data.map(item => item[1]);
  }, [data, showData]);

  // Extract labels from data
  const labels = useMemo(() => data.map(item => item[0]), [data]);

  return {
    visibleData,
    labels,
    isAnimating: !showData
  };
};
