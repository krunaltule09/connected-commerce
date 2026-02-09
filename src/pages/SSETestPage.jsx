import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useSSE } from '../context/SSEContext';
import SSETester from '../components/SSETester';
import navigationService from '../services/NavigationService';

const SSETestPage = () => {
  const { connected, clientId } = useSSE();
  const [targetApp, setTargetApp] = useState('operate-experience');
  const [route, setRoute] = useState('/personal-welcome');
  const [customData, setCustomData] = useState('');
  
  const handleSendNavigation = async () => {
    try {
      let data = {};
      if (customData) {
        try {
          data = JSON.parse(customData);
        } catch (e) {
          console.error('Invalid JSON data:', e);
          alert('Please enter valid JSON data');
          return;
        }
      }
      
      await navigationService.sendNavigationEvent('NAVIGATE', targetApp, route, data);
    } catch (error) {
      console.error('Failed to send navigation event:', error);
    }
  };
  
  const predefinedRoutes = {
    'operate-experience': [
      '/welcome',
      '/personal-welcome',
      '/financial-statement',
      '/y14-report/large',
      '/dscr-trend',
      '/covenant-monitoring',
      '/benefits-summary',
      '/loan-service'
    ],
    'connected-commerce': [
      '/',
      '/explore',
      '/document-scan',
      '/document-centre',
      '/operational-doc-scan',
      '/financial-dashboard',
      '/y14-report',
      '/data-simulator',
      '/anomaly-detection'
    ]
  };
  
  return (
    <Box sx={{ p: 4, backgroundColor: '#171723', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ color: '#FFE600', mb: 4 }}>
        SSE Integration Test Page
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              backgroundColor: '#1e1e2d',
              border: '1px solid #333340',
              borderRadius: '8px'
            }}
          >
            <Typography variant="h6" sx={{ color: '#FFE600', mb: 3 }}>
              Send Navigation Event
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="target-app-label" sx={{ color: '#a4a3b1' }}>Target Application</InputLabel>
                <Select
                  labelId="target-app-label"
                  value={targetApp}
                  onChange={(e) => {
                    setTargetApp(e.target.value);
                    setRoute(predefinedRoutes[e.target.value][0]);
                  }}
                  label="Target Application"
                  sx={{ 
                    color: '#fff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#333340'
                    }
                  }}
                >
                  <MenuItem value="operate-experience">operate-experience</MenuItem>
                  <MenuItem value="connected-commerce">connected-commerce</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="route-label" sx={{ color: '#a4a3b1' }}>Route</InputLabel>
                <Select
                  labelId="route-label"
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  label="Route"
                  sx={{ 
                    color: '#fff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#333340'
                    }
                  }}
                >
                  {predefinedRoutes[targetApp].map((r) => (
                    <MenuItem key={r} value={r}>{r}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <TextField
                label="Custom Data (JSON)"
                multiline
                rows={4}
                value={customData}
                onChange={(e) => setCustomData(e.target.value)}
                fullWidth
                placeholder='{"key": "value"}'
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: '#333340'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: '#a4a3b1'
                  }
                }}
              />
              
              <Button 
                variant="contained" 
                onClick={handleSendNavigation}
                disabled={!connected}
                sx={{ 
                  backgroundColor: '#FFE600',
                  color: '#000',
                  '&:hover': {
                    backgroundColor: '#d4c000'
                  },
                  '&.Mui-disabled': {
                    backgroundColor: '#3b3b3b',
                    color: '#a4a3b1'
                  }
                }}
              >
                Send Navigation Event
              </Button>
            </Box>
            
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" sx={{ color: '#a4a3b1', mb: 1 }}>
                Connection Status
              </Typography>
              <Typography variant="body2" sx={{ color: connected ? '#4caf50' : '#f44336' }}>
                {connected ? 'Connected' : 'Disconnected'}
              </Typography>
              {clientId && (
                <Typography variant="body2" sx={{ color: '#dedee2', mt: 1 }}>
                  Client ID: {clientId}
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <SSETester />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SSETestPage;
