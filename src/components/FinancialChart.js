import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { useScanning } from '../context/ScanningContext';
import { useFinancialData } from '../context/FinancialDataContext';
import { useChartData } from '../hooks/useChartData';
import { createChartDataset, createChartOptions } from '../utils/chartConfig';
import { ChartLoadingAnimation, AnimatedChartContainer, ChartBackground } from './common/ChartAnimations';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function FinancialChart() {
  // Hooks
  const { selectedMetric, getSelectedData, formatValue } = useFinancialData();
  const { isFinancialDataReady, scanProgress } = useScanning();
  const chartRef = useRef(null);
  
  // Get current data for the selected metric
  const currentData = getSelectedData();
  
  // Use custom hook for chart data processing and animation
  const { visibleData, labels } = useChartData(currentData, isFinancialDataReady, selectedMetric);
  
  // Create chart data and options using utility functions
  const data = {
    labels,
    datasets: [createChartDataset(visibleData)],
  };
  
  // Override options to disable aspect ratio constraint
  const options = {
    ...createChartOptions(selectedMetric, formatValue),
    maintainAspectRatio: false
  };

  return (
    <AnimatePresence mode="wait">
      {!isFinancialDataReady ? (
        <ChartLoadingAnimation progress={scanProgress} />
      ) : (
        <AnimatedChartContainer metricKey={selectedMetric}>
          <ChartBackground>
            <Box sx={{ height: '14.5rem', width: '35.75rem', marginLeft:'3rem', boxSizing: 'border-box' }}>
              <Bar 
                key={`chart-${selectedMetric}`} 
                ref={chartRef} 
                data={data} 
                options={options}
                style={{ 
                  display: 'block',
                  height: '14.5rem',
                  width: '35.75rem',
                  boxSizing: 'border-box'
                }}
              />
            </Box>
          </ChartBackground>
        </AnimatedChartContainer>
      )}
    </AnimatePresence>
  );
}
