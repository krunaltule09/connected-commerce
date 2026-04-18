import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// Removed unused import: handleDocumentDragStart
import { GradientBorderBox } from './common';
import { useConfig } from '../context/ConfigContext';

export default function DocumentCard({ document, onClick, isSelected }) {
  const { assets } = useConfig();
  return (
<GradientBorderBox 
    sx={{
      marginRight: '1rem',
      ...(isSelected && { border: '0.07rem solid #FFE600' })
    }} 
    isGradientBorder={!isSelected}
    borderWidth={isSelected ? '0.14rem' : '1px'}
  >
    <Box
      sx={{
        position: 'relative',
        minWidth: 320,
        maxWidth: 320,

        cursor: 'pointer',

        padding: '1px',
        overflow: 'hidden',
        transition: 'transform 0.2s',
      }}
      onClick={() => onClick?.(document)}


    >
      <Box 
        sx={{ 
          position: 'relative', 
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          padding: 2.5,
        }}
      >
      {/* Document title with optional tick mark */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
        <Typography
          sx={{
            color: '#FFE600',
            fontFamily: 'var(--font-family-primary, Inter, Roboto, Helvetica, Arial, sans-serif)',
            fontWeight: 700,
            fontSize: '1.125rem',
            lineHeight: '1.3',
            height: '2.6em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flexGrow: 1,
          }}
        >
          {document.name}
        </Typography>
        
        {isSelected && (
          <CheckCircleIcon 
            sx={{ 
              color: '#4CAF50', 
              fontSize: '1.5rem',
              ml: 1,
              flexShrink: 0,
              filter: 'drop-shadow(0px 0px 3px rgba(76, 175, 80, 0.5))'
            }} 
          />
        )}
      </Box>
      
      {/* Document preview */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          bgcolor: '#343340',
          borderRadius: '14px',
          mt: 1,
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            bgcolor: '#343340',

            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            src={document.url || assets['Banking_Capital_Market_Operate_Table_Vector_Icon.svg']}
            alt={document.name}
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: 1,
            }}
          />
        </Box>
      </Box>
      </Box>
    </Box>
    </GradientBorderBox>
  );
}
