import { Box, Stack, Typography, Button, Chip, Grid } from '@mui/material';

export default function CovenantTile({ covenant }) {
  return (
    <Box
      sx={{
        backgroundColor: '#121214',
        borderRadius: 1,
        p: 1.5,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box>
            <Typography variant="body2" sx={{ color: 'rgba(252, 252, 252, 0.7)', mb: 0.5 }}>
              {covenant.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#FCFCFC', fontWeight: 500 }}>
              Value
            </Typography>
            <Typography variant="body2" sx={{ color: '#FCFCFC' }}>
              {covenant.value}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="subtitle1" sx={{ color: '#FCFCFC', fontWeight: 500, mb: 0.5 }}>
              Indicator
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box 
                component="img" 
                src={`${process.env.PUBLIC_URL}/assets/${covenant.status === 'alert' ? 'Vector (1).svg' : 'shield-alert.svg'}`} 
                alt={covenant.indicator} 
                sx={{ mr: 1, height: 20, width: 20 }}
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: covenant.status === 'alert' ? '#FF3B30' : '#FFCC00',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                }}
              >
                {covenant.indicator}
              </Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button
            size="small"
            variant="outlined"
            sx={{
              color: '#FCFCFC',
              borderColor: 'rgba(252, 252, 252, 0.3)',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              textTransform: 'none',
              fontSize: '0.75rem',
              padding: '6px 12px',
              borderRadius: '4px',
              '&:hover': {
                borderColor: '#FCFCFC',
              },
            }}
          >
            View Formula & Historical Values
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
