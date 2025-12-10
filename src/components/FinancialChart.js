import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Box } from '@mui/material';
import { useScanning } from '../context/ScanningContext';
import { useFinancialData } from '../context/FinancialDataContext';
import { Bar } from 'react-chartjs-2';
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
  const { selectedMetric, getSelectedData, formatValue } = useFinancialData();
  const chartRef = useRef(null);
  const { isFinancialDataReady } = useScanning();
  const [animationProgress, setAnimationProgress] = useState(0);
  // Get the current data for the selected metric
  const currentData = useMemo(() => getSelectedData(), [selectedMetric, getSelectedData]);
  
  // Calculate visible data points based on animation progress
  const calculateVisibleData = () => {
    const fullData = currentData.map(item => item[1]);
    const visibleCount = Math.ceil(fullData.length * animationProgress);
    return fullData.map((value, index) => index < visibleCount ? value : 0);
  };
  
  // Memoize chart data
  const data = useMemo(() => ({
    labels: currentData.map(item => item[0]),
    datasets: [
      {
        label: 'YoY Trend',
        data: calculateVisibleData(),
        backgroundColor: '#B4FF00',
        borderColor: '#B4FF00',
        borderWidth: 0,
        borderRadius: 10,
        borderSkipped: 'bottom',
        barThickness: 9,
        maxBarThickness: 16,
        // Hover effects
        hoverBackgroundColor: '#FFCC00',
        hoverBorderColor: '#FFCC00',
        hoverBorderWidth: 2,
      },
    ],
  }), [currentData, animationProgress]);

  // Memoize chart options
  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
      delay: (context) => {
        // Add a staggered delay for each bar
        return context.dataIndex * 100;
      },
    },
    transitions: {
      active: {
        animation: {
          duration: 400
        }
      }
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 10,
        left: 10
      }
    },
    plugins: {
      title: {
        display: true,
        text: selectedMetric,
        color: '#FFFFFF',
        font: {
          size: 16,
          weight: 'bold',
        },
        align: 'start',
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#FFCC00',
        titleColor: '#000000',
        bodyColor: '#000000',
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
        },
        padding: 12,
        displayColors: false,
        callbacks: {
          title: function(tooltipItems) {
            return tooltipItems[0].label;
          },
          label: function(context) {
            return formatValue(context.parsed.y);
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: 'rgba(252, 252, 252, 0.7)',
          font: {
            size: 12,
          },
          padding: 10,
        },
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false,
          lineWidth: 1,
          drawTicks: false,
          borderDash: [5, 5],
        },
        ticks: {
          color: 'rgba(252, 252, 252, 0.7)',
          font: {
            size: 12,
          },
          padding: 10,
          callback: function(value) {
            if (selectedMetric === 'Interest' || selectedMetric === 'Expense') {
              return '$' + value + 'M';
            }
            return '$' + value + 'B';
          }
        },
        beginAtZero: true,
      },
    },
  }), [selectedMetric]);

  // Reset animation and force chart update when metric changes
  useEffect(() => {
    // Reset animation progress
    setAnimationProgress(0);
    
    // We don't need to manually update the chart since we're using a key prop
    // on the Bar component that will force a complete re-render
  }, [selectedMetric]);

  // Effect for progressive chart animation
  useEffect(() => {
    if (!isFinancialDataReady) return;
    
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
  }, [isFinancialDataReady, selectedMetric]);
  
  // Effect for custom animation on chart initialization
  useEffect(() => {
    const chart = chartRef.current;
    
    if (chart && isFinancialDataReady) {
      // Add a fade-in effect to the chart container
      const canvas = chart.canvas;
      if (canvas) {
        canvas.style.opacity = 0;
        canvas.style.transition = 'opacity 1s ease-in-out';
        
        setTimeout(() => {
          canvas.style.opacity = 1;
        }, 300);
      }
    }
  }, [isFinancialDataReady, selectedMetric]);

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url('${process.env.PUBLIC_URL}/assets/Group%207.svg')`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 0,
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', height: '82%', p: 1 }}>
        <Bar 
          key={`chart-${selectedMetric}`} 
          ref={chartRef} 
          data={data} 
          options={options} 
        />
      </Box>
    </Box>
  );
}
