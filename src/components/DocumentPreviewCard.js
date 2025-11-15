import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

export default function DocumentPreviewCard({ document, onDropDocumentId }) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id && onDropDocumentId) onDropDocumentId(id);
  };

  const renderContent = () => {

      return (
        <Box sx={{ height: { xs: 280, md: 420 }, position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ position: 'relative', width: 150, height: 150 }}>
              <Box sx={{
                position: 'absolute',
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }} />
              <Box sx={{
                position: 'absolute',
                width: 102,
                height: 102,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }} />
              <Box sx={{
                position: 'absolute',
                width: 54,
                height: 54,
                borderRadius: '50%',
                background: '#FFE600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0px 2px 8px rgba(0,0,0,0.35)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}>
                <AddRoundedIcon sx={{ color: '#000' }} />
              </Box>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                mt: 2,
                color: '#FCFCFC',
                fontFamily: 'var(--font-family-primary, Inter, Roboto, Helvetica, Arial, sans-serif)',
                fontWeight: 'var(--font-weight-regular, 400)',
                fontSize: 'var(--font-size-16, 16px)',
                lineHeight: 'var(--line-height-24, 24px)',
                letterSpacing: 'var(--letter-spacing-0, 0)',
              }}
            >
              Drag & Drop
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(252,252,252,0.7)',
                fontFamily: 'var(--font-family-primary, Inter, Roboto, Helvetica, Arial, sans-serif)',
                fontWeight: 'var(--font-weight-regular, 400)',
                fontSize: 'var(--font-size-16, 16px)',
                lineHeight: 'var(--line-height-24, 24px)',
                letterSpacing: 'var(--letter-spacing-0, 0)',
              }}
            >
              The document you need
            </Typography>
          </Box>
        </Box>
      );
    

   
  };

  return (
    <Card
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      sx={{
        borderRadius: 2,
        bgcolor: '#1A1A24',
        border: '1px solid #1D8583',
      }}
    >
      <CardContent>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
            color: '#FFE600',
            fontFamily: 'var(--font-family-primary, Inter, Roboto, Helvetica, Arial, sans-serif)',
            fontWeight: 'var(--font-weight-regular, 400)',
            fontSize: 'var(--font-size-16, 16px)',
            lineHeight: 'var(--line-height-24, 24px)',
            letterSpacing: 'var(--letter-spacing-0, 0)',
          }}
        >
          Document Preview
        </Typography>
        <Box sx={{
          bgcolor: '#343340',
          borderRadius: 2,
          p: 2,
        }}>
          {renderContent()}
        </Box>
      </CardContent>
    </Card>
  );
}
