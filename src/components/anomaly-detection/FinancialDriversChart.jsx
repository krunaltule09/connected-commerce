import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useFinancialDriversData } from '../../hooks';

/**
 * Financial Drivers Chart Component
 * Displays quarter-by-quarter financial drivers using an area chart
 */
export default function FinancialDriversChart({ style = {} }) {
  const { data, loading } = useFinancialDriversData();
  const [animationProgress, setAnimationProgress] = useState(0);

  // Initialize animation progress immediately to prevent incorrect initial rendering
  useEffect(() => {
    if (!loading && data.length > 0) {
      // Set animation progress to 0.001 immediately to establish proper baseline position
      setAnimationProgress(0.001);
      
      // Then start the actual animation after a short delay
      const timer = setTimeout(() => {
        setAnimationProgress(1);
      }, 300); // Reduced delay for smoother transition
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
        p: 0,
        ...style
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          color: '#FFE600', 
          fontSize: { xs: '1.125rem', md: '1.25rem' },
          fontWeight: 400, 
          mb: 3,
          pl: 2,
          pt: 2
        }}
      >
        Quarter-by-quarter financial drivers
      </Typography>
      <ResponsiveContainer width="100%" height={310}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
        >
          <defs>
            <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFE600" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#8B6F47" stopOpacity={0.6}/>
            </linearGradient>
            <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#991B1B" stopOpacity={0.7}/>
            </linearGradient>
            <linearGradient id="colorCashFlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34D399" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#047857" stopOpacity={0.7}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="0" stroke="#3F4254" vertical={true} horizontal={false} />
          <XAxis 
            dataKey="quarter" 
            stroke="#9CA3AF" 
            tick={{ fill: '#D1D5DB', fontSize: 14 }}
            axisLine={{ stroke: '#3F4254' }}
          />
          <YAxis 
  stroke="#9CA3AF"
  tick={{ fill: '#D1D5DB', fontSize: 12 }}
  tickFormatter={(value) => `$${value / 1000}K`}
  label={{ 
    value: 'Total Amount', 
    angle: -90, 
    position: 'insideLeft', 
    fill: '#9CA3AF', 
    fontSize: 12 
  }}
  axisLine={{ stroke: '#3F4254' }}
  domain={[15000, 'dataMax']}
  ticks={[15000, 20000, 25000, 30000, 35000]}
  allowDecimals={false}
/>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: 'none', 
              borderRadius: '8px',
              color: 'rgba(255,255,255,1)',
              fontWeight: 700
            }}
            formatter={(value) => `$${(value / 1000).toFixed(1)}K`}
            labelStyle={{ color: 'rgba(255,255,255,1)', fontWeight: 700 }}
            itemStyle={{ color: 'rgba(255,255,255,1)', fontWeight: 700 }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => (
              <span style={{ 
                color: 'rgba(255,255,255,1)', 
                marginRight: '5px',
                fontWeight: 700,
                fontSize: "12.8px"
              }}>
                {value}
              </span>
            )}
          />
          <Area 
            type="monotone" 
            dataKey="cashFlow" 
            stroke="#34D399" 
            fill="url(#colorCashFlow)"
            name="Cash Flow"
            animationBegin={0}
            animationDuration={1500}
            animationEasing="ease-out"
            isAnimationActive={animationProgress > 0}
          />
          <Area 
            type="monotone" 
            dataKey="interest" 
            stroke="#EF4444" 
            fill="url(#colorInterest)"
            name="Interest"
            animationBegin={100}
            animationDuration={1500}
            animationEasing="ease-out"
            isAnimationActive={animationProgress > 0}
          />
          <Area 
            type="monotone" 
            dataKey="debt" 
            stroke="#FFE600" 
            fill="url(#colorDebt)"
            name="Debt"
            animationBegin={200}
            animationDuration={1500}
            animationEasing="ease-out"
            isAnimationActive={animationProgress > 0}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
