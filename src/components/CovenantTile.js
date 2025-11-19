import { Box, Typography, Button, Grid } from '@mui/material';

export default function CovenantTile({ covenant }) {
  return (
    <Box
      sx={{
        backgroundColor: '#121214',
        borderRadius: 1,
        p: 1,
        borderLeft: '1px solid rgba(90, 200, 250, 0.3)',
        mb: 1,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={5}>
          <Box>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: '#FCFCFC', 
                fontWeight: 600, 
                fontSize: '0.9rem',
                mb: 1
              }}
            >
              {covenant.name}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(252, 252, 252, 0.7)', 
                mb: 0.5,
                fontSize: '0.8rem'
              }}
            >
              Value
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#FCFCFC',
                fontWeight: 500
              }}
            >
              {covenant.value}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(252, 252, 252, 0.7)', 
                mb: 0.5,
                fontSize: '0.9rem',
                textAlign: 'center'
              }}
            >
              Indicator
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box 
                component="img" 
                src={`${process.env.PUBLIC_URL}/assets/${covenant.status === 'alert' ? 'Vector (1).svg' : 'shield-alert.svg'}`} 
                alt={covenant.indicator} 
                sx={{ mr: 1, height: 24, width: 24 }}
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: covenant.status === 'alert' ? '#FF3B30' : '#FFCC00',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                }}
              >
                {covenant.indicator}
              </Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button
            size="small"
            variant="outlined"
            sx={{
              color: '#FCFCFC',
              borderColor: 'rgba(252, 252, 252, 0.3)',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              textTransform: 'none',
              fontSize: '0.8rem',
              padding: '4px 8px',
              borderRadius: '4px',
              '&:hover': {
                borderColor: '#FCFCFC',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
