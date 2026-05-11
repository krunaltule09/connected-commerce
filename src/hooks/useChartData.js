import { useMemo } from 'react';

export const useChartData = (data, isReady) => {
  // Return real data directly — Chart.js handles transition animation
  const visibleData = useMemo(() => {
    if (!isReady) return data.map(() => 0);
    return data.map(item => item[1]);
  }, [data, isReady]);

  // Extract labels from data
  const labels = useMemo(() => data.map(item => item[0]), [data]);

  return {
    visibleData,
    labels,
  };
};
