import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * DocumentCardDetails component displays a detailed view of a document
 * with styling to match the second screenshot provided
 */
export default function DocumentCardDetails({ document }) {
  // Move useState hooks before the conditional return
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  
  // Modified for better touchpad support - lower threshold for easier detection
  const swipeThreshold = 30; // Lower threshold for easier detection
  const swipePower = (offset) => {
    return offset; // Just use the raw offset for touchpad compatibility
  };
  
  // Add keyboard navigation support - moved before conditional return
  useEffect(() => {
    if (!document) return; // Skip effect if no document
    
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentPage(prev => {
          const newDirection = -1;
          const nextPage = (prev + newDirection + 3) % 3; // Hardcoded 3 pages for safety
          setDirection(newDirection);
          return nextPage;
        });
      } else if (e.key === 'ArrowRight') {
        setCurrentPage(prev => {
          const newDirection = 1;
          const nextPage = (prev + newDirection + 3) % 3; // Hardcoded 3 pages for safety
          setDirection(newDirection);
          return nextPage;
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [document, currentPage]); // Include document and currentPage in dependencies
  
  if (!document) return null;
  
  // Mock pages for demonstration
  const pages = [
    { id: 0, url: document.url || `${process.env.PUBLIC_URL}/assets/doc1.svg` },
    { id: 1, url: `${process.env.PUBLIC_URL}/assets/doc2.svg` },
    { id: 2, url: `${process.env.PUBLIC_URL}/assets/doc3.svg` },
  ];
  
  const paginate = (newDirection) => {
    // Calculate new page index, with wrapping
    const nextPage = (currentPage + newDirection + pages.length) % pages.length;
    setCurrentPage(nextPage);
    setDirection(newDirection);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        mx: 'auto',
      }}
    >
      {/* Document title */}
      <Typography
        sx={{
          color: '#FFE600',
          fontFamily: 'var(--font-family-primary, Inter, Roboto, Helvetica, Arial, sans-serif)',
          fontWeight: 700,
          fontSize: '1.5rem',
          lineHeight: '40px',
          letterSpacing: '-0.02em',
          mb: 3,
          height: 'auto',
          textAlign: 'center',
        }}
      >
        {document.name}
      </Typography>
      
      {/* Document preview container with dark background */}
      <Box
        sx={{
          bgcolor: '#343340',
          borderRadius: 2,
          p: 2,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Document content container with white background */}
        <Box
          sx={{
            bgcolor: '#FFFFFF',
            borderRadius: 1,
            overflow: 'hidden',
            height: 'calc(70vh - 100px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: '2px',
              zIndex: 10,
            }
          }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              style={{ 
                width: '100%', 
                height: '100%', 
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                touchAction: 'pan-y',
              }}
            key={currentPage}
            custom={direction}
            variants={{
              enter: (direction) => ({
                x: direction > 0 ? 1000 : -1000,
                opacity: 0,
                rotateY: direction > 0 ? 45 : -45,
              }),
              center: {
                x: 0,
                opacity: 1,
                rotateY: 0,
                transition: {
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  rotateY: { duration: 0.4 }
                }
              },
              exit: (direction) => ({
                x: direction < 0 ? 1000 : -1000,
                opacity: 0,
                rotateY: direction < 0 ? 45 : -45,
                transition: {
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  rotateY: { duration: 0.4 }
                }
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            dragMomentum={false}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}
            onDragEnd={(e, { offset, velocity }) => {
              console.log('Drag ended with offset:', offset.x, 'velocity:', velocity.x);
              const swipe = swipePower(offset.x);
              
              // Simple threshold-based detection for touchpad compatibility
              if (swipe < -swipeThreshold) {
                console.log('Swiping to next page');
                paginate(1); // Swipe left to go right (next page)
              } else if (swipe > swipeThreshold) {
                console.log('Swiping to previous page');
                paginate(-1); // Swipe right to go left (previous page)
              }
            }}
            // Add onDrag handler to detect movement during drag
            onDrag={(e, info) => {
              console.log('Dragging with offset:', info.offset.x);
            }}
          >
            <Box
              component="img"
              src={pages[currentPage].url}
              alt={`Page ${currentPage + 1}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: { xs: 2, sm: 3, md: 4 },
                maxHeight: '100%',
              }}
            />
          </motion.div>
          </AnimatePresence>
          
          {/* Removed navigation arrows - using only swipe gesture */}
        </Box>
      </Box>
      
      {/* Page indicator */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 2 
        }}
      >
        {pages.map((page, index) => (
          <Box 
            key={page.id}
            sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              bgcolor: currentPage === index ? '#FFE600' : 'rgba(255,255,255,0.3)', 
              mx: 0.5,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }} 
            onClick={() => {
              const newDirection = index > currentPage ? 1 : -1;
              setDirection(newDirection);
              setCurrentPage(index);
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
