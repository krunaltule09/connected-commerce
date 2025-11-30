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
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        // Prevent default browser scrolling behavior
        e.preventDefault();
        e.stopPropagation();
        
        // Only handle left/right for page flipping
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
        // Return false to prevent further event handling
        return false;
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
            perspective: '1200px', // Add perspective for 3D effect
            transformStyle: 'preserve-3d', // Maintain 3D space for children
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
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '4px',
              backgroundColor: 'rgba(0,0,0,0.05)',
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
                x: direction > 0 ? '100%' : '-100%',
                opacity: 0,
                rotateY: direction > 0 ? 60 : -60,
                scale: 0.85,
                zIndex: 0,
                boxShadow: '0px 0px 0px rgba(0,0,0,0)',
                filter: 'blur(2px)'
              }),
              center: {
                x: 0,
                opacity: 1,
                rotateY: 0,
                scale: 1,
                zIndex: 1,
                boxShadow: '0px 10px 30px rgba(0,0,0,0.2)',
                filter: 'blur(0px)',
                transition: {
                  x: { type: 'spring', stiffness: 400, damping: 25 },
                  opacity: { duration: 0.4 },
                  rotateY: { type: 'spring', stiffness: 500, damping: 25 },
                  scale: { type: 'spring', stiffness: 300, damping: 25 },
                  filter: { duration: 0.3 }
                }
              },
              exit: (direction) => ({
                x: direction < 0 ? '100%' : '-100%',
                opacity: 0,
                rotateY: direction < 0 ? 60 : -60,
                scale: 0.85,
                zIndex: 0,
                boxShadow: '0px 0px 0px rgba(0,0,0,0)',
                filter: 'blur(2px)',
                transition: {
                  x: { type: 'spring', stiffness: 400, damping: 25 },
                  opacity: { duration: 0.4 },
                  rotateY: { type: 'spring', stiffness: 500, damping: 25 },
                  scale: { type: 'spring', stiffness: 300, damping: 25 },
                  filter: { duration: 0.3 }
                }
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            dragMomentum={true}
            dragTransition={{ 
              bounceStiffness: 600, 
              bounceDamping: 20,
              power: 0.5 // More natural feeling
            }}
            whileDrag={{ 
              scale: 0.98,
              boxShadow: '0px 5px 15px rgba(0,0,0,0.15)',
              rotateY: (_, { point }) => {
                // Calculate rotation based on drag position
                // This creates a dynamic rotation effect while dragging
                return point.x < window.innerWidth / 2 ? -5 : 5;
              }
            }}
            onDragEnd={(e, { offset, velocity }) => {
              // Use both offset and velocity for a more natural feel
              const swipe = swipePower(offset.x);
              const velocityFactor = Math.abs(velocity.x) > 500 ? 0.5 : 1;
              const effectiveThreshold = swipeThreshold * velocityFactor;
              
              if (swipe < -effectiveThreshold || velocity.x < -500) {
                paginate(1); // Swipe left to go right (next page)
              } else if (swipe > effectiveThreshold || velocity.x > 500) {
                paginate(-1); // Swipe right to go left (previous page)
              }
            }}
            onDrag={(e, info) => {
              // Calculate dynamic rotation based on drag position
              const rotationFactor = info.offset.x / 50; // Adjust divisor for sensitivity
              e.target.style.transform = `rotateY(${rotationFactor}deg)`;
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
                backfaceVisibility: 'hidden', // Prevent seeing the back of the element during flip
                boxShadow: '0 0 15px rgba(0,0,0,0.05)', // Subtle shadow for depth
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: 'translateZ(0)', // Force GPU acceleration
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
