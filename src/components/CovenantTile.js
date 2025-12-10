import { Box, Typography, Button, Tooltip } from '@mui/material';

export default function CovenantTile({ covenant }) {
  // Determine the indicator icon and color based on status
  const getIndicatorIcon = (status) => {
    if (status === 'alert') {
      return {
        icon: 'Vector (1).svg',
        color: '#FF3B30'
      };
    } else {
      return {
        icon: 'shield-alert.svg',
        color: '#FFCC00'
      };
    }
  };

  const indicatorDetails = getIndicatorIcon(covenant.status);

  return (
    <Box
      sx={{
        position: 'relative',
        mb: 2.5,
        pb: 2,
        pt: 1,
      }}
    >
      {/* Covenant Name */}
      <Tooltip title={covenant.name} placement="top" arrow>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#FFFFFF', 
            fontWeight: 600, 
            fontSize: '1rem',
            mb: 2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%'
          }}
        >
          {covenant.name}
        </Typography>
      </Tooltip>

      {/* Main Content - Flexbox layout instead of Grid */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap'
      }}>
        {/* Value Section */}
        <Box sx={{ width: '25%' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(252, 252, 252, 0.7)', 
              mb: 0.5,
              fontSize: '0.75rem'
            }}
          >
            Value
          </Typography>
          <Tooltip title={covenant.value} placement="top" arrow>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#FFFFFF',
                fontWeight: 500,
                fontSize: '0.75rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%'
              }}
            >
              {covenant.value}
            </Typography>
          </Tooltip>
        </Box>
        
        {/* Indicator Section */}
        <Box sx={{ width: '25%' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(252, 252, 252, 0.7)', 
              mb: 0.5,
              fontSize: '0.75rem'
            }}
          >
            Indicator
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box 
              component="img" 
              src={`${process.env.PUBLIC_URL}/assets/${indicatorDetails.icon}`} 
              alt={covenant.indicator} 
              sx={{ mr: 1, height: 18, width: 18 }}
            />
            <Tooltip title={covenant.indicator} placement="top" arrow>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: indicatorDetails.color,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%'
                }}
              >
                {covenant.indicator}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
        
        {/* Button Section */}
        <Box sx={{ width: '40%', textAlign: 'right' }}>
          <Button
            size="small"
            variant="outlined"
            title="View Formula & Historical Values"
            sx={{
              color: '#FFFFFF',
              borderColor: 'rgba(252, 252, 252, 0.3)',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              textTransform: 'none',
              fontSize: '0.7rem',
              padding: '6px 10px',
              borderRadius: '4px',
              height: '30px',
              width: '100%',
              '&:hover': {
                borderColor: '#FFFFFF',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
              },
            }}
          >
            <Tooltip title="View Formula & Historical Values" placement="top" arrow>
              <Box sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                display: 'block'
              }}>
                View Formula & Historical
              </Box>
            </Tooltip>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
