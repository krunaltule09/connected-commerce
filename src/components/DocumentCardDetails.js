import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
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
  // We're tracking these states but not displaying them in the UI
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [totalPages, setTotalPages] = useState(0);
  
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
  
  if (!document) return null;
  
  // All document pages including cover
  const pages = [
    { id: 0, url: document.url || `${process.env.PUBLIC_URL}/assets/doc1.svg` },
    { id: 1, url: `${process.env.PUBLIC_URL}/assets/doc1.svg` },
    { id: 2, url: `${process.env.PUBLIC_URL}/assets/doc2.svg` },
    { id: 3, url: `${process.env.PUBLIC_URL}/assets/doc3.svg` },
    { id: 4, url: document.url || `${process.env.PUBLIC_URL}/assets/doc1.svg` },
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
        borderBottom: '1px solid rgba(255,230,0,0.2)'
      }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FFE600' }}>
          {document.name}
        </Typography>
      </Box>
      
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: '#1A1A24', /* Match the dark theme */
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Flip Book */}
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
          mobileScrollSupport={true}
          onFlip={handlePageChange}
          startPage={0}
          flippingTime={800}
          style={{ 
            backgroundColor: 'transparent',
            width: '95%', /* Take almost full width of container */
            height: '95%', /* Take almost full height of container */
            margin: '0 auto' /* Center the book */
          }}
        >
          {/* All pages including first and last */}
          {pages.map((page) => (
            <Page key={page.id} number={page.id} url={page.url} />
          ))}
        </HTMLFlipBook>
      </Box>
    </Box>
  );
}
