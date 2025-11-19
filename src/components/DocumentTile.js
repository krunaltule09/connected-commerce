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
            background: '#E6E6E9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/assets/Vector.svg`}
              alt=""
              sx={{ width: 31, height: 31 }}
            />
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
