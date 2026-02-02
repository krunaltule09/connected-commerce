import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useDSCRData } from '../../hooks';

/**
 * Custom Tooltip Component for DSCR Chart
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Box 
        sx={{ 
          backgroundColor: '#FFE600', 
          color: '#1A1A24', 
          px: 2, 
          py: 1.5, 
          borderRadius: 1, 
          fontSize: '0.875rem',
          fontWeight: 500,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
        }}
      >
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: '#1A1A24', fontSize: '0.875rem' }}>
          {data.quarter}
        </Typography>
        <Typography sx={{ color: '#1A1A24', fontSize: '0.875rem', mb: 0.5 }}>
          {data.period}
        </Typography>
        <Typography sx={{ color: '#1A1A24', fontSize: '0.875rem', mt: 0.5 }}>
          DSCR: <Box component="span" sx={{ fontWeight: 700 }}>{data.dscr}</Box>
        </Typography>
        <Typography sx={{ color: '#1A1A24', fontSize: '0.875rem', mt: 0.5 }}>
          Covenant threshold: <Box component="span" sx={{ fontWeight: 700 }}>{data.threshold}</Box>
        </Typography>
      </Box>
    );
  }
  return null;
};

/**
 * Quarterly DSCR Chart Component
 * Displays quarterly DSCR (Debt Service Coverage Ratio) with covenant threshold
 */
export default function QuarterlyDSCRChart({ style = {} }) {
  const { data, loading } = useDSCRData();
  const [activeBar, setActiveBar] = useState(1); // Q2 index
  const [animationProgress, setAnimationProgress] = useState(0);

  // Animate the chart rendering with delay
  useEffect(() => {
    if (!loading && data.length > 0) {
      const timer = setTimeout(() => {
        setAnimationProgress(1);
      }, 500); // Delay before starting animation
      return () => clearTimeout(timer);
    }
  }, [loading, data]);

  if (loading) {
    return (
      <Box 
        sx={{ 
          width: '100%', 
          height: '100%', 
          minHeight: 400,
          backgroundColor: '#1A1A24', 
          borderRadius: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          ...style
        }}
      >
        <Typography sx={{ color: 'rgba(252, 252, 252, 0.5)' }}>Loading...</Typography>
      </Box>
    );
  }


  return (
    <Box 
      sx={{ 
        width: '100%', 
        height: '100%',
        backgroundColor: '#1A1A24', 
        borderRadius: 2, 
        p: 3,
        ...style
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          color: '#FFE600', 
          fontSize: { xs: '1.125rem', md: '1.25rem' },
          fontWeight: 400, 
          mb: 1 
        }}
      >
        Quarterly DSCR
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(252, 252, 252, 1)', 
            fontSize: { xs: '0.875rem', md: '1rem' },
            mb: 0.5,
            fontWeight:300
          }}
        >
          Covenant threshold line
        </Typography>
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#FCFCFC', 
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 600 
          }}
        >
          1.1
        </Typography>
      </Box>
      <ResponsiveContainer width="100%" height={270}>
        <BarChart
          data={data}
          margin={{ top: 50, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFE600" stopOpacity={1}/>
              <stop offset="100%" stopColor="#3D3020" stopOpacity={1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="0" stroke="#3F4254" vertical={false} horizontal={false} />
          <XAxis 
            dataKey="quarter" 
            stroke="#9CA3AF" 
            tick={{ fill: '#D1D5DB', fontSize: 14 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            hide={true}
            domain={[0, 3]}
          />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={false}
          />
          <ReferenceLine 
            y={1.1} 
            stroke="#6B7280" 
            strokeDasharray="3 3" 
            strokeWidth={2}
          />
          <Bar 
            dataKey="dscr" 
            fill="url(#barGradient)"
            radius={[4, 4, 4, 4]}
            barSize={100}
            onMouseEnter={(_, index) => setActiveBar(index)}
            animationBegin={0}
            animationDuration={2500}
            animationEasing="ease-out"
            isAnimationActive={animationProgress > 0}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
