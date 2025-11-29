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
        display: 'flex',
        flexDirection: 'column',
        minWidth: 240,
        maxWidth: 240,
        mr: 3,
        cursor: 'pointer',
        bgcolor: "rgba(26,26,36,1)",
        borderRadius: 2,
        border: '0.1px solid',
        borderColor: 'transparent',
        // borderImage: 'linear-gradient(82deg, rgba(255,230,0,1), rgba(244, 167, 157, 0) 100%)',
        borderImageSlice: 1,
        padding: 2,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
      onClick={() => onClick?.(document)}
      draggable
      onDragStart={handleDocumentDragStart(document)}
    >
      {/* Document title */}
      <Typography
        sx={{
          color: '#FFE600',
          fontFamily: 'var(--font-family-primary, Inter, Roboto, Helvetica, Arial, sans-serif)',
          fontWeight: 700,
          fontSize: '1rem',
          lineHeight: '1.2',
          mb: 1,
          height: '2.4em',
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
            src={document.url || `${process.env.PUBLIC_URL}/assets/Vector.svg`}
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
  );
}
