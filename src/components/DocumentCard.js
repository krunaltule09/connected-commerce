import { Box, Typography } from '@mui/material';
import { handleDocumentDragStart } from '../utils';

/**
 * DocumentCard component displays a document preview with its title
 * Used in the horizontal scrollable list in DocumentCentrePage
 * Styled to match the design in the screenshot
 */
export default function DocumentCard({ document, onClick }) {
  return (

    <Box
      sx={{
        position: 'relative',
        minWidth: 320,
        maxWidth: 320,
        mr: 3,
        cursor: 'pointer',
        borderRadius: 2,
        bgcolor: "rgba(26,26,36,1)",
        padding: '1px',
        overflow: 'hidden',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'conic-gradient(from 0deg, #EEF96E 0deg, rgba(244, 167, 157, 0.5) 90deg, transparent 180deg, transparent 270deg, #EEF96E 360deg)',
          animation: 'rotate 4s linear infinite',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '1px',
          left: '1px',
          right: '1px',
          bottom: '1px',
          background: "rgba(26,26,36,1)",
          borderRadius: 'inherit',
          zIndex: 1,
        },
        '@keyframes rotate': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      }}
      onClick={() => onClick?.(document)}
      draggable
      onDragStart={handleDocumentDragStart(document)}
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
      {/* Document title */}
      <Typography
        sx={{
          color: '#FFE600',
          fontFamily: 'var(--font-family-primary, Inter, Roboto, Helvetica, Arial, sans-serif)',
          fontWeight: 700,
          fontSize: '1.125rem',
          lineHeight: '1.3',
          mb: 1.5,
          height: '2.6em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {document.name}
      </Typography>
      
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
            src={document.url || '/assets/Vector.svg'}
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
  );
}
