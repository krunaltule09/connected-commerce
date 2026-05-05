import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import HTMLFlipBook from "react-pageflip";
import { useConfig } from '../context/ConfigContext';
import PdfFlipBook from './PdfFlipBook';

// Page component for flipbook pages
const Page = React.forwardRef((props, ref) => {
  return (
    <div className="doc-page" ref={ref}>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px',
        backgroundColor: '#fff',
        boxShadow: '0 0 5px rgba(0,0,0,0.1)',
        borderRadius: '4px',
      }}>
        <img
          src={props.url}
          alt={`Page ${props.number}`}
          style={{
            maxWidth: '98%',
            maxHeight: '98%',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  );
});

/**
 * DocumentCardDetails component displays a detailed view of a document.
 * If the document has a pdfUrl, renders an interactive PDF viewer.
 * Otherwise, renders the existing SVG flipbook.
 */
export default function DocumentCardDetails({ document }) {
  const { assets } = useConfig();
  const flipBookRef = useRef();
  const containerRef = useRef(null);

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

  const isPdf = !!document?.pdfUrl;

  // Handle keyboard navigation
  useEffect(() => {
    if (!document) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();

        if (isPdf) {
          // PDF flipbook navigation
          if (flipBookRef.current) {
            if (e.key === 'ArrowLeft') {
              flipBookRef.current.flipPrev();
            } else {
              flipBookRef.current.flipNext();
            }
          }
        } else {
          // Image flipbook navigation
          if (flipBookRef.current && flipBookRef.current.pageFlip) {
            if (e.key === 'ArrowLeft') {
              flipBookRef.current.pageFlip().flipPrev();
            } else {
              flipBookRef.current.pageFlip().flipNext();
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [document, isPdf]);

  // Initialize total pages count for flipbook
  useEffect(() => {
    if (!isPdf && flipBookRef.current && flipBookRef.current.pageFlip) {
      setTimeout(() => {
        setTotalPages(flipBookRef.current.pageFlip().getPageCount());
      }, 100);
    }
  }, [isPdf]);

  // Handle page change for flipbook
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
        e.preventDefault();
        e.stopPropagation();

        initialDistance = getDistance(touches);
        initialScale = lastScale;

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
        e.preventDefault();
        e.stopPropagation();

        const currentDistance = getDistance(touches);
        const scaleFactor = currentDistance / initialDistance;
        const newScale = Math.max(1, Math.min(3, initialScale * scaleFactor));
        lastScale = newScale;
        setScale(newScale);

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

  // Flipbook pages (used only when no PDF)
  const pages = [
    { id: 0, url: document.url || assets['Banking_Capital_Market_Operate_Table_Document_Template_1.svg'] },
    { id: 1, url: assets['Banking_Capital_Market_Operate_Table_Document_Template_1.svg'] },
    { id: 2, url: assets['Banking_Capital_Market_Operate_Table_Document_Template_2.svg'] },
    { id: 3, url: assets['Banking_Capital_Market_Operate_Table_Document_Template_3.svg'] },
    { id: 4, url: document.url || assets['Banking_Capital_Market_Operate_Table_Document_Template_1.svg'] },
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
          bgcolor: '#1A1A24',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          touchAction: 'none',
        }}
      >
        <div
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transition: isPanning ? 'none' : 'transform 0.3s ease',
            width: '95%',
            height: '95%',
          }}
        >
          {isPdf ? (
            <PdfFlipBook
              ref={flipBookRef}
              pdfUrl={document.pdfUrl}
              onPageChange={handlePageChange}
            />
          ) : (
            <HTMLFlipBook
              ref={flipBookRef}
              width={500}
              height={700}
              size="stretch"
              minWidth={400}
              maxWidth={900}
              minHeight={600}
              maxHeight={1000}
              maxShadowOpacity={0.3}
              showCover={false}
              mobileScrollSupport={touchCount < 2}
              onFlip={handlePageChange}
              startPage={0}
              flippingTime={800}
              style={{
                backgroundColor: 'transparent',
                width: '100%',
                height: '100%',
                margin: '0 auto'
              }}
            >
              {pages.map((page) => (
                <Page key={page.id} number={page.id} url={page.url} />
              ))}
            </HTMLFlipBook>
          )}
        </div>
      </Box>
    </Box>
  );
}
