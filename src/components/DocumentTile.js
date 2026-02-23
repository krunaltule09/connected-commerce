import { Card, CardActionArea, Stack, Typography, Box } from '@mui/material';
import { handleDocumentDragStart } from '../utils';

export default function DocumentTile({ doc, selected, onSelect }) {

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: '20px',
        bgcolor: '#35343E',
        color: '#FCFCFC',
        borderColor: 'rgba(0,0,0,0.15)',
        boxShadow: 'none',
        height: 156,
        width: '100%',
        cursor: 'grab',
      }}
      draggable
      onDragStart={handleDocumentDragStart(doc)}
    >
      <CardActionArea onClick={() => onSelect?.(doc)} sx={{ height: '100%', borderRadius: '20px' }}>
        <Stack spacing={1.25} p={1.5} alignItems="stretch" sx={{ height: '100%' }}>
          <Box sx={{
            flex: '0 0 auto',
            width: '100%',
            height: 100,
            borderRadius: '12px',
            background: '#343340',
            border: '1px solid',
            borderColor: 'transparent',
            borderImage: 'linear-gradient(130deg,rgba(255, 230, 0, 1) 0%, rgba(46, 46, 56, 1) 60%) 1',
            borderImageSlice: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            {doc.url ? (
              <Box
                sx={{
                  width: '90%',
                  height: '90%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 1,
                }}
              >
                <Box
                  component="img"
                  src={doc.url}
                  alt={doc.name}
                  sx={{ 
                    maxWidth: '90%',
                    maxHeight: '90%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            ) : (
              <Box
                component="img"
                src="/assets/doc_preview.jpeg"
                alt=""
                sx={{ width: 31, height: 31 }}
              />
            )}
          </Box>
          <Stack spacing={0.25} sx={{ flex: '1 1 auto', justifyContent: 'center' }}>
            <Typography
              variant="caption"
              noWrap
              sx={{
                fontFamily: 'var(--font-family-primary, Inter, Roboto, Helvetica, Arial, sans-serif)',
                fontWeight: 'var(--font-weight-regular, 400)',
                fontSize: '1rem',
                lineHeight: 'var(--line-height-24, 24px)',
                letterSpacing: 'var(--letter-spacing-0, 0)',
              }}
            >
              {doc.name}
            </Typography>
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
