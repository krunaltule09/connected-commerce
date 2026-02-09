import React from 'react';
import { Box, Typography, Button, Paper, Chip, Alert } from '@mui/material';
import { useSSE } from '../context/SSEContext';

/**
 * Component for testing SSE connections and events
 */
const SSETester = () => {
  const { connected, clientId, events, error, reconnect } = useSSE();

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        m: 2, 
        maxWidth: '800px',
        backgroundColor: '#1e1e2d',
        border: '1px solid #333340',
        borderRadius: '8px'
      }}
    >
      <Typography variant="h5" sx={{ color: '#FFE600', mb: 2 }}>
        SSE Connection Tester
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ color: '#fff', mb: 1 }}>
          Connection Status:
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip 
            label={connected ? 'Connected' : 'Disconnected'} 
            color={connected ? 'success' : 'error'} 
            variant="outlined"
            sx={{ 
              borderWidth: 2,
              '& .MuiChip-label': { fontWeight: 'bold' }
            }}
          />
          {clientId && (
            <Typography variant="body2" sx={{ color: '#a4a3b1' }}>
              Client ID: {clientId}
            </Typography>
          )}
        </Box>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3, backgroundColor: 'rgba(211, 47, 47, 0.15)' }}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ mb: 3 }}>
        <Button 
          variant="contained" 
          onClick={reconnect}
          sx={{ 
            backgroundColor: '#2e2e38',
            '&:hover': { backgroundColor: '#3a3a48' }
          }}
        >
          Reconnect
        </Button>
      </Box>
      
      <Box>
        <Typography variant="subtitle1" sx={{ color: '#fff', mb: 1 }}>
          Recent Events:
        </Typography>
        <Box 
          sx={{ 
            maxHeight: '300px', 
            overflowY: 'auto',
            p: 2,
            backgroundColor: '#23232f',
            borderRadius: '4px',
            border: '1px solid #33333e',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(255, 230, 0, 1)',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'rgba(255, 230, 0, 0.8)',
              },
            },
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 230, 0, 1) rgba(255, 255, 255, 0.05)',
          }}
        >
          {events.length > 0 ? (
            events.map((event, index) => (
              <Box 
                key={index} 
                sx={{ 
                  mb: 2, 
                  p: 2, 
                  backgroundColor: '#2a2a36',
                  borderRadius: '4px',
                  border: '1px solid #33333e',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Chip 
                    label={event.type || 'Unknown'} 
                    size="small" 
                    sx={{ backgroundColor: '#3b3b4f', color: '#fff' }}
                  />
                  <Typography variant="caption" sx={{ color: '#a4a3b1' }}>
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#dedee2', mb: 1 }}>
                  Action: {event.action || 'N/A'} | Target: {event.targetAppId || 'N/A'}
                </Typography>
                {event.route && (
                  <Typography variant="body2" sx={{ color: '#dedee2', mb: 1 }}>
                    Route: {event.route}
                  </Typography>
                )}
                {event.data && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" sx={{ color: '#a4a3b1', display: 'block', mb: 0.5 }}>
                      Data:
                    </Typography>
                    <Box 
                      sx={{ 
                        backgroundColor: '#1e1e2d', 
                        p: 1, 
                        borderRadius: '4px',
                        maxHeight: '100px',
                        overflowY: 'auto'
                      }}
                    >
                      <pre style={{ margin: 0, color: '#dedee2', fontSize: '0.75rem' }}>
                        {JSON.stringify(event.data, null, 2)}
                      </pre>
                    </Box>
                  </Box>
                )}
              </Box>
            ))
          ) : (
            <Typography variant="body2" sx={{ color: '#a4a3b1', textAlign: 'center', py: 2 }}>
              No events received yet
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default SSETester;
