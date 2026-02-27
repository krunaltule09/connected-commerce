import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import HTMLFlipBook from "react-pageflip";

// Page component for all pages
const Page = React.forwardRef((props, ref) => {
  return (
    <div className="doc-page" ref={ref}>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px', /* Minimal padding */
        backgroundColor: '#fff',
        boxShadow: '0 0 5px rgba(0,0,0,0.1)',
        borderRadius: '4px',
      }}>
        <img 
          src={props.url} 
          alt={`Page ${props.number}`}
          style={{
            maxWidth: '98%', /* Maximize image size */
            maxHeight: '98%', /* Maximize image size */
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  );
});

/**
 * DocumentCardDetails component displays a detailed view of a document
 * with styling to match the second screenshot provided
 */
export default function DocumentCardDetails({ document }) {
  const flipBookRef = useRef();
  const containerRef = useRef(null);
  
  // We're tracking these states but not displaying them in the UI
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [totalPages, setTotalPages] = useState(0);
  
  // Zoom and pan states
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [touchCount, setTouchCount] = useState(0);
  
  // Handle keyboard navigation
  useEffect(() => {
    if (!document) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        // Prevent default browser scrolling behavior
        e.preventDefault();
        e.stopPropagation();
        
        if (flipBookRef.current && flipBookRef.current.pageFlip) {
          if (e.key === 'ArrowLeft') {
            flipBookRef.current.pageFlip().flipPrev();
          } else if (e.key === 'ArrowRight') {
            flipBookRef.current.pageFlip().flipNext();
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [document]);
  
  // Initialize total pages count
  useEffect(() => {
    if (flipBookRef.current && flipBookRef.current.pageFlip) {
      setTimeout(() => {
        setTotalPages(flipBookRef.current.pageFlip().getPageCount());
      }, 100);
    }
  }, []);
  
  // Handle page change
  const handlePageChange = (e) => {
    setCurrentPage(e.data);
  };
  
  // Handle zoom in/out
  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.25, 3));
  };
  
  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.25, 1));
  };
  
  // eslint-disable-next-line no-unused-vars
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };
  
  // Touch event handlers for pinch zoom and two-finger pan
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let initialDistance = 0;
    let initialScale = 1;
    let lastScale = scale;
    
    const getDistance = (touches) => {
      return Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY
      );
    };
    
    const handleTouchStart = (e) => {
      const touches = e.touches;
      setTouchCount(touches.length);
      
      if (touches.length === 2) {
        // Prevent page flipping when using two fingers
        e.preventDefault();
        e.stopPropagation();
        
        // Initialize pinch-to-zoom with current scale
        initialDistance = getDistance(touches);
        initialScale = lastScale;
        
        // Initialize two-finger pan
        setIsPanning(true);
        setStartPosition({
          x: (touches[0].clientX + touches[1].clientX) / 2,
          y: (touches[0].clientY + touches[1].clientY) / 2
        });
      }
    };
    
    const handleTouchMove = (e) => {
      const touches = e.touches;
      
      if (touches.length === 2) {
        // Prevent default behavior to avoid page scrolling
        e.preventDefault();
        e.stopPropagation();
        
        // Handle pinch-to-zoom
        const currentDistance = getDistance(touches);
        const scaleFactor = currentDistance / initialDistance;
        const newScale = Math.max(1, Math.min(3, initialScale * scaleFactor));
        lastScale = newScale;
        setScale(newScale);
        
        // Handle two-finger pan
        if (isPanning) {
          const currentPosition = {
            x: (touches[0].clientX + touches[1].clientX) / 2,
            y: (touches[0].clientY + touches[1].clientY) / 2
          };
          
          setPosition(prevPosition => ({
            x: prevPosition.x + (currentPosition.x - startPosition.x) / scale,
            y: prevPosition.y + (currentPosition.y - startPosition.y) / scale
          }));
          
          setStartPosition(currentPosition);
        }
      }
    };
    
    const handleTouchEnd = (e) => {
      setTouchCount(e.touches.length);
      if (e.touches.length < 2) {
        setIsPanning(false);
      }
    };
    
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchcancel', handleTouchEnd);
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [scale, isPanning, startPosition]);
  
  if (!document) return null;
  
  // All document pages including cover
  const pages = [
    { id: 0, url: document.url || '/assets/doc1.svg' },
    { id: 1, url: '/assets/doc1.svg' },
    { id: 2, url: '/assets/doc2.svg' },
    { id: 3, url: '/assets/doc3.svg' },
    { id: 4, url: document.url || '/assets/doc1.svg' },
  ];

  return (
    <Box sx={{ 
      p: 0, 
      height: '100%', 
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <Box sx={{ 
        p: 1, 
        backgroundColor: '#1A1A24',
        borderBottom: '1px solid rgba(255,230,0,0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FFE600' }}>
          {document.name}
        </Typography>
        
        {/* Zoom controls */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleZoomOut} sx={{ color: '#FFE600' }}>
            <ZoomOutIcon />
          </IconButton>
          <Typography variant="body2" sx={{ color: '#FFE600', mx: 1 }}>
            {Math.round(scale * 100)}%
          </Typography>
          <IconButton onClick={handleZoomIn} sx={{ color: '#FFE600' }}>
            <ZoomInIcon />
          </IconButton>
        </Box>
      </Box>
      
      <Box
        ref={containerRef}
        sx={{
          flexGrow: 1,
          bgcolor: '#1A1A24', /* Match the dark theme */
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          touchAction: 'none', /* Disable browser's default touch actions */
        }}
      >
        {/* Flip Book */}
        {/* No instructions text - removed as requested */}
        
        <div
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transition: isPanning ? 'none' : 'transform 0.3s ease',
            width: '95%',
            height: '95%',
          }}
        >
          <HTMLFlipBook
            ref={flipBookRef}
            width={500} /* Further increased width */
            height={700} /* Further increased height */
            size="stretch"
            minWidth={400} /* Further increased min width */
            maxWidth={900} /* Further increased max width */
            minHeight={600} /* Further increased min height */
            maxHeight={1000} /* Further increased max height */
            maxShadowOpacity={0.3} /* Slightly increased shadow for better depth */
            showCover={false}
            mobileScrollSupport={touchCount < 2} /* Disable when using two fingers */
            onFlip={handlePageChange}
            startPage={0}
            flippingTime={800}
            style={{ 
              backgroundColor: 'transparent',
              width: '100%',
              height: '100%',
              margin: '0 auto' /* Center the book */
            }}
          
        >
          {/* All pages including first and last */}
          {pages.map((page) => (
            <Page key={page.id} number={page.id} url={page.url} />
          ))}
        </HTMLFlipBook>
        </div>
      </Box>
    </Box>
  );
}
