import { useEffect, useState } from 'react';
import { Box, Container, Grid, Stack, Typography, Modal, IconButton, Button, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
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
  const [addedDocuments, setAddedDocuments] = useState([]);

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
  
  const handleAddDocument = useButtonSound((doc) => {
    // Check if document is already added
    if (!addedDocuments.find(d => d.id === doc.id)) {
      setAddedDocuments(prev => [...prev, doc]);
    }
  });
  
  const handleRemoveDocument = (docId) => {
    setAddedDocuments(prev => prev.filter(d => d.id !== docId));
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDocument(null);
    setSelectedId(null);
  };

  // Handle scan document with sound effect
  const handleScanDocument = useButtonSound(async () => {
    if (addedDocuments.length === 0) return;
    
    navigate('/financial-dashboard')
    
    try {
      // Send navigation event to operate-experience app
      await navigationService.navigateToOperateExperience('/financial-statement', {
        referrer: 'document-centre',
        action: 'SCAN_DOCUMENT',
        documentIds: addedDocuments.map(d => d.id)
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
                    color: '#FCFCFC',
                    fontFamily: 'var(--font-family-primary, Inter, Roboto, Helvetica, Arial, sans-serif)',
                    fontWeight: 300,
                    fontSize: '1.1rem',
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
                    fontSize: '1.1rem',
                    lineHeight: '28px',
                    letterSpacing: 0,
                    marginRight:'10.5rem'
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
              pb: 4,
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

        {/* Document Addition Section */}
        <Box sx={{ mt: 6, mb: 4 }}>
          <Typography
            sx={{
              color: '#FCFCFC',
              fontFamily: 'var(--font-family-primary, Inter, Roboto, Helvetica, Arial, sans-serif)',
              fontWeight: 600,
              fontSize: '1.125rem',
              mb: 3,
              letterSpacing: '0.01em',
            }}
          >
            Add Documents for Scanning
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 3,
            flexWrap: 'wrap'
          }}>

            {/* Added Document Circles */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', flex: 1 }}>
              <AnimatePresence>
                {addedDocuments.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: index * 0.1
                    }}
                  >
                    <Tooltip 
                      title={doc.name}
                      arrow
                      placement="top"
                      componentsProps={{
                        tooltip: {
                          sx: {
                            bgcolor: '#FFE600',
                            color: '#000',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            maxWidth: 200,
                            '& .MuiTooltip-arrow': {
                              color: '#FFE600',
                            },
                          },
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          bgcolor: '#FFE600',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          overflow: 'hidden',
                          boxShadow: '0 4px 15px rgba(255, 230, 0, 0.4)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 8px 25px rgba(255, 230, 0, 0.6)',
                          },
                          '&:hover .remove-icon': {
                            opacity: 1,
                          },
                        }}
                        onClick={() => handleRemoveDocument(doc.id)}
                      >
                        {/* Document SVG */}
                        <Box
                          component="img"
                          src={doc.url || '/assets/Vector.svg'}
                          alt={doc.name}
                          sx={{
                            width: '60%',
                            height: '60%',
                            objectFit: 'contain',
                            filter: 'brightness(0) invert(1)',
                          }}
                        />
                        
                        {/* Remove Icon Overlay */}
                        <Box
                          className="remove-icon"
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            bgcolor: 'rgba(0, 0, 0, 0.7)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                          }}
                        >
                          <CloseIcon sx={{ color: '#FFE600', fontSize: 32 }} />
                        </Box>
                      </Box>
                    </Tooltip>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Box>

            {/* Scan Document Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={handleScanDocument}
                disabled={addedDocuments.length === 0}
                sx={{
                  backgroundColor: addedDocuments.length > 0 ? '#FFE600' : 'rgba(255, 230, 0, 0.3)',
                  color: addedDocuments.length > 0 ? '#000' : 'rgba(0, 0, 0, 0.5)',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: '1rem',
                  minWidth: 180,
                  cursor: addedDocuments.length > 0 ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: addedDocuments.length > 0 ? '#d4c000' : 'rgba(255, 230, 0, 0.3)',
                    transform: addedDocuments.length > 0 ? 'translateY(-2px)' : 'none',
                    boxShadow: addedDocuments.length > 0 ? '0px 6px 20px rgba(255, 230, 0, 0.4)' : 'none',
                  },
                  '&:disabled': {
                    backgroundColor: 'rgba(255, 230, 0, 0.2)',
                    color: 'rgba(0, 0, 0, 0.4)',
                  },
                  boxShadow: addedDocuments.length > 0 ? '0px 4px 15px rgba(255, 230, 0, 0.3)' : 'none',
                }}
              >
                Scan Documents ({addedDocuments.length})
              </Button>
            </motion.div>
          </Box>
        </Box>

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
            if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
              e.stopPropagation();
            }
          }}
        >
          <AnimatePresence>
            {modalOpen && (
              <motion.div
            tabIndex={0}
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
            overflow: 'hidden',
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
            <Box sx={{ 
              flexGrow: 1, 
              overflow: 'auto',
              mb: 2
            }}>
              <DocumentCardDetails document={selectedDocument} />
            </Box>
            
            {/* Add to Selection Button */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              gap: 2,
              py: 2,
              position: 'relative',
              zIndex: 10,
              mt: 'auto',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <Button
                onClick={() => {
                  if (selectedDocument) {
                    handleAddDocument(selectedDocument);
                    handleCloseModal();
                  }
                }}
                disabled={selectedDocument && addedDocuments.find(d => d.id === selectedDocument.id)}
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
                  '&:disabled': {
                    backgroundColor: 'rgba(255, 230, 0, 0.3)',
                    color: 'rgba(0, 0, 0, 0.5)',
                  },
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
                }}
              >
                {selectedDocument && addedDocuments.find(d => d.id === selectedDocument.id) 
                  ? 'Already Added' 
                  : 'Add to Selection'}
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
