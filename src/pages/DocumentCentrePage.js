import { useEffect, useMemo, useState } from 'react';
import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { fetchDocuments, fetchDocumentById } from '../utils/api';
import DocumentList from '../components/DocumentList';
import DocumentPreviewCard from '../components/DocumentPreviewCard';

export default function DocumentCentrePage() {
  const [documents, setDocuments] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const selected = useMemo(
    () => documents.find((d) => String(d.id) === String(selectedId)) || null,
    [documents, selectedId]
  );

  useEffect(() => {
    let mounted = true;
    fetchDocuments().then((docs) => {
      if (!mounted) return;
      setDocuments(docs || []);
      if (docs && docs.length) setSelectedId(String(docs[0].id));
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    if (!selected || selected.url) return undefined;
    fetchDocumentById(selected.id).then((full) => {
      if (!active) return;
      if (full) {
        setDocuments((prev) => prev.map((d) => (String(d.id) === String(full.id) ? { ...d, ...full } : d)));
      }
    });
    return () => {
      active = false;
    };
  }, [selected]);

  const handleDropDocumentId = (id) => {
    setSelectedId(String(id));
  };

  const count = documents.length;

  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} lg={3}>
            <Typography
              component="h1"
              sx={{
                mb: 1.5,
                color: '#5AC8FA',
                fontFamily: 'EYInterstate, Inter, Roboto, Helvetica, Arial, sans-serif',
                fontWeight: 700,
                fontStyle: 'normal',
                fontSize: '1.875rem',
                lineHeight: '100%',
                letterSpacing: 0,
              }}
            >
              Document Centre
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 1.25,
                borderColor: 'rgba(0,0,0,0.15)',
                bgcolor: 'transparent',
                height: { xs: 360, md: 'calc(100vh - 200px)' },
                overflow: 'hidden',
              }}
            >
              <DocumentList
                documents={documents}
                selectedId={selectedId}
                onSelect={(d) => setSelectedId(String(d.id))}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
            <Box sx={{

              p: 3,
              bgcolor: '#05020A',
            }}>
              <Grid container sx={{ mb: 2 }}>
                <Grid item xs={12} md={8}>
                  <Stack spacing={0.5}>
                    <Typography
                      sx={{
                        color: '#FCFCFC',
                        fontFamily: 'var(--font-family-primary, Inter, Roboto, Helvetica, Arial, sans-serif)',
                        fontWeight: 'var(--font-weight-bold, 700)',
                        fontSize: '1.25rem',
                        lineHeight: 'var(--line-height-30, 30px)',
                        letterSpacing: 'var(--letter-spacing--2, -0.02em)',
                      }}
                    >
                      Case no. #CCN3267890
                    </Typography>
                    <Typography
                      sx={{
                        color: 'rgba(252,252,252,0.7)',
                        fontFamily: 'var(--font-family-primary, Inter, Roboto, Helvetica, Arial, sans-serif)',
                        fontWeight: 'var(--font-weight-light, 300)',
                        fontSize: '1.125rem',
                        lineHeight: 'var(--line-height-28, 28px)',
                        letterSpacing: 'var(--letter-spacing-0, 0)',
                      }}
                    >
                      Applied by: Logistics Company
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
                    <Typography
                      sx={{
                        color: '#FCFCFC',
                        fontFamily: 'var(--font-family-primary, Inter, Roboto, Helvetica, Arial, sans-serif)',
                        fontWeight: 'var(--font-weight-bold, 700)',
                        fontSize: '1.25rem',
                        lineHeight: 'var(--line-height-30, 30px)',
                        letterSpacing: 'var(--letter-spacing--2, -0.02em)',
                      }}
                    >
                      Documents Received
                    </Typography>
                    <Typography
                      sx={{
                        color: '#FCFCFC',
                        fontFamily: 'var(--font-family-primary, Inter, Roboto, Helvetica, Arial, sans-serif)',
                        fontWeight: 'var(--font-weight-light, 300)',
                        fontSize: '1.125rem',
                        lineHeight: 'var(--line-height-28, 28px)',
                        letterSpacing: 'var(--letter-spacing-0, 0)',
                      }}
                    >
                      {count}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>

              <Box

              >
                <hr  style={{
                  width: '100%',

                  border: '1px solid #1D8583',
                  margin: "20px 0px"
                  
                }} />
              </Box>

              <DocumentPreviewCard document={selected} onDropDocumentId={handleDropDocumentId} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
