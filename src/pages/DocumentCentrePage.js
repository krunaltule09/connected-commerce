import { useEffect, useState } from 'react';
import { Box, Container, Grid, Stack, Typography, Modal, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { fetchDocuments, fetchDocumentById } from '../utils/api';
import navigationService from '../services/NavigationService';
import { useButtonSound } from '../hooks';
import DocumentCard from '../components/DocumentCard';
import DocumentCardDetails from '../components/DocumentCardDetails';

export default function DocumentCentrePage() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch all documents on component mount
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

  // Update selected document when selectedId changes
  useEffect(() => {
    if (!selectedId) return;
    
    const doc = documents.find((d) => String(d.id) === String(selectedId));
    setSelectedDocument(doc || null);
    
    // Fetch full document details if needed
    if (doc && !doc.url) {
      let active = true;
      fetchDocumentById(selectedId).then((full) => {
        if (!active) return;
        if (full) {
          // Ensure the document has a URL, or assign one based on index
          const updatedDoc = { ...full };
          if (!updatedDoc.url) {
            const svgIndex = parseInt(updatedDoc.id) % 3;
            if (svgIndex === 0) {
              updatedDoc.url = '/assets/doc1.svg';
            } else if (svgIndex === 1) {
              updatedDoc.url = '/assets/doc2.svg';
            } else {
              updatedDoc.url = '/assets/doc3.svg';
            }
          }
          
          setDocuments((prev) => 
            prev.map((d) => (String(d.id) === String(updatedDoc.id) ? updatedDoc : d))
          );
          setSelectedDocument(updatedDoc);
        }
      });
      return () => {
        active = false;
      };
    }
  }, [selectedId, documents]);

  const handleSelectDocument = (doc) => {
    setSelectedId(String(doc.id));
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDocument(null);
    setSelectedId(null);
  };

  // Handle scan document with sound effect
  const handleScanDocument = useButtonSound(async () => {
    // Close the modal
    handleCloseModal();
    
    navigate('/financial-dashboard')
    
    try {
      // Send navigation event to operate-experience app
      await navigationService.navigateToOperateExperience('/financial-statement', {
        referrer: 'document-centre',
        action: 'SCAN_DOCUMENT',
        documentId: selectedId
      });
      
    } catch (error) {
      console.error('Failed to send navigation event:', error);
    }
  });
  

  const count = documents.length;

  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', pt: 10, pb: 6 }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ mb: 6 }}>
          <Grid container sx={{ mb: 2 }}>
            <Grid item xs={12} md={8}>
              <Stack spacing={0.5}>
                <Typography
                  sx={{
                    color: '#FCFCFC',
                    fontFamily: 'var(--font-family-primary, Inter, Roboto, Helvetica, Arial, sans-serif)',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    lineHeight: '30px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Case no. #CCN3267890
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(252,252,252,0.7)',
                    fontFamily: 'var(--font-family-primary, Inter, Roboto, Helvetica, Arial, sans-serif)',
                    fontWeight: 300,
                    fontSize: '1.125rem',
                    lineHeight: '28px',
                    letterSpacing: 0,
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
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    lineHeight: '30px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Documents Received
                </Typography>
                <Typography
                  sx={{
                    color: '#FCFCFC',
                    fontFamily: 'var(--font-family-primary, Inter, Roboto, Helvetica, Arial, sans-serif)',
                    fontWeight: 300,
                    fontSize: '1.125rem',
                    lineHeight: '28px',
                    letterSpacing: 0,
                  }}
                >
                  {count}
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          {/* Horizontal Separator */}
          <Box>
            <hr style={{
              width: '100%',
              border: '1px solid #1D8583',
              margin: "20px 0px"
            }} />
          </Box>
        </Box>

        {/* Horizontally Scrollable Document List */}
        <motion.div
          initial={false}
          animate={{
            opacity: 1
          }}
        >
          <Box 
            sx={{ 
              display: 'flex',
              overflowX: 'auto',
              overflowY: 'hidden',
              py: 3,
              px: 1,
              pb: 4, // Extra padding at bottom for scrollbar
              '&::-webkit-scrollbar': {
                height: '6px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '10px',
              },
            }}
          >
          {documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                y: 0,
                scale: 1
              }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.5,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -5,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
            >
              <DocumentCard 
                document={doc} 
                onClick={handleSelectDocument}
              />
            </motion.div>
          ))}
        </Box>
        </motion.div>

        {/* Modal for Document Details */}
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          closeAfterTransition
          disableScrollLock={false}
          aria-labelledby="document-details-modal"
          aria-describedby="displays detailed view of the selected document"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onKeyDown={(e) => {
            // Prevent arrow key events from propagating
            if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
              e.stopPropagation();
            }
          }}
        >
          <AnimatePresence>
            {modalOpen && (
              <motion.div
            tabIndex={0} /* Add tabIndex to capture keyboard events */
            initial={{ opacity: 0, scale: 0.7, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 50 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              duration: 0.4
            }}
            style={{
              width: '70vw',
              maxWidth: '800px',
              outline: 'none',
            }}
            onKeyDown={(e) => {
              // Additional keyboard event handling at this level
              if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
          <Box sx={{
            position: 'relative',
            width: '100%',
            height: '80vh',
            maxWidth: '700px',
            aspectRatio: '9/16',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: '#000',
            boxShadow: 24,
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
            outline: 'none',
            mx: 'auto',
            overflow: 'hidden', // Changed from auto to hidden
          }}>
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{ 
                position: 'absolute', 
                right: 16, 
                top: 16,
                color: '#FFE600',
                bgcolor: 'rgba(0, 0, 0, 0.3)',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  color: '#FFE600',
                },
                zIndex: 9999,
                padding: '8px',
              }}
            >
              <CloseIcon fontSize="medium" />
            </IconButton>
            {/* Document content with flex-grow to take available space */}
            <Box sx={{ 
              flexGrow: 1, 
              overflow: 'auto',
              mb: 2
            }}>
              <DocumentCardDetails document={selectedDocument} />
            </Box>
            
            {/* Scan Button - fixed at bottom */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              py: 2,
              position: 'relative',
              zIndex: 10,
              mt: 'auto', // Push to bottom
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <Button
                onClick={handleScanDocument}
                sx={{
                  backgroundColor: '#FFE600',
                  color: '#000',
                  fontWeight: 600,
                  px: 4,
                  py: 1,
                  borderRadius: '4px',
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: '#d4c000',
                  },
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
                }}
              >
                Scan Document
              </Button>
            </Box>
          </Box>
          </motion.div>
            )}
          </AnimatePresence>
        </Modal>
      </Container>
    </Box>
  );
}
