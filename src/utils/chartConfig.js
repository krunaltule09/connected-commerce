import { METRIC_UNITS } from '../constants/financialData';

/**
 * Generate chart dataset configuration
 * 
 * @param {Array} data - The data for the chart
 * @returns {Object} - Chart dataset configuration
 */
export const createChartDataset = (data) => ({
  label: 'YoY Trend',
  data,
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
});

/**
 * Generate chart options
 * 
 * @param {string} metricTitle - The title of the metric
 * @param {Function} formatValue - Function to format tooltip values
 * @returns {Object} - Chart options configuration
 */
export const createChartOptions = (metricTitle, formatValue) => ({
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
      text: metricTitle,
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
          const unit = METRIC_UNITS[metricTitle] || '';
          return '$' + value + unit;
        }
      },
      beginAtZero: true,
    },
  },
});
