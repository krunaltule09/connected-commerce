import { Box, Typography, Button, Tooltip } from '@mui/material';

export default function CovenantTile({ covenant }) {
  // Determine the indicator icon and color based on status
  const getIndicatorIcon = (status) => {
    if (status === 'alert') {
      return {
        icon: '/assets/Vector (1).svg',
        color: '#fff'
      };
    } else {
      return {
        icon: '/assets/shield-alert.svg',
        color: '#fff'
      };
    }
  };

  const indicatorDetails = getIndicatorIcon(covenant.status);

  return (
    <Box
      sx={{
        position: 'relative',
        mb: 1,

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
            mb: 1,
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
        {/* Value Section - Increased width */}
        <Box sx={{ width: '40%' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(252, 252, 252, 0.7)', 
              mb: 1,
              fontSize: '0.75rem'
            }}
          >
            Value
          </Typography>
          <Tooltip title={covenant.value} placement="top" arrow>
            <Box>
              {/* Split the value into main part and bracketed part */}
              {(() => {
                const value = covenant.value;
                // Updated regex to handle cases with or without space before brackets
                const bracketMatch = value.match(/(.+?)(\s*)(\(.+\))/);
                
                if (bracketMatch) {
                  return (
                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'baseline' }}>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#FFFFFF',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                          display: 'inline'
                        }}
                      >
                        {bracketMatch[1]}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'rgba(252, 252, 252, 0.7)', // Same color as the value label
                          fontWeight: 400, // Keeping normal weight for brackets as requested
                          fontSize: '0.7rem',
                          display: 'inline',
                          ml: bracketMatch[2] ? 0.5 : 0 // Add margin only if there was a space
                        }}
                      >
                        {bracketMatch[3]}
                      </Typography>
                    </Box>
                  );
                } else {
                  return (
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#FFFFFF',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        whiteSpace: 'normal',
                        overflow: 'visible',
                        maxWidth: '100%'
                      }}
                    >
                      {value}
                    </Typography>
                  );
                }
              })()}
            </Box>
          </Tooltip>
        </Box>
        
        {/* Indicator Section */}
        <Box sx={{ width: '18%' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(252, 252, 252, 0.7)', 
              mb: 1,
              fontSize: '0.75rem'
            }}
          >
            Indicator
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box 
              component="img" 
              src={indicatorDetails.icon} 
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
        <Box sx={{ width: '38%', textAlign: 'right' }}>
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
