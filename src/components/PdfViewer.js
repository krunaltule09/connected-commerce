import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;

const PdfViewer = forwardRef(({ pdfUrl }, ref) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  // Measure container size
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerSize({ width, height });
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const goToNextPage = useCallback(() => {
    setPageNumber((prev) => Math.min(prev + 1, numPages || prev));
  }, [numPages]);

  const goToPrevPage = useCallback(() => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  }, []);

  // Expose navigation methods to parent
  useImperativeHandle(ref, () => ({
    nextPage: goToNextPage,
    prevPage: goToPrevPage,
  }), [goToNextPage, goToPrevPage]);

  const onDocumentLoadSuccess = ({ numPages: total }) => {
    setNumPages(total);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (err) => {
    console.error('PDF load error:', err);
    setError('Failed to load PDF document.');
    setLoading(false);
  };

  // Calculate page dimensions to fit container while maintaining aspect ratio
  const pageWidth = containerSize.width > 0 ? containerSize.width - 40 : undefined;
  const pageHeight = containerSize.height > 0 ? containerSize.height - 80 : undefined;

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {loading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress sx={{ color: '#FFE600' }} />
          <Typography sx={{ color: '#aaa', fontSize: '0.875rem' }}>
            Loading PDF...
          </Typography>
        </Box>
      )}

      {error && (
        <Typography sx={{ color: '#ff6b6b', fontSize: '0.875rem', textAlign: 'center', px: 2 }}>
          {error}
        </Typography>
      )}

      <Box sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        overflow: 'hidden',
      }}>
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading=""
        >
          {numPages && (
            <Page
              pageNumber={pageNumber}
              width={pageWidth}
              height={pageHeight}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              loading=""
            />
          )}
        </Document>
      </Box>

      {/* Page navigation controls */}
      {numPages && !error && (
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          py: 1,
          px: 2,
          borderTop: '1px solid rgba(255, 230, 0, 0.15)',
          width: '100%',
        }}>
          <IconButton
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            sx={{
              color: '#FFE600',
              '&.Mui-disabled': { color: 'rgba(255, 230, 0, 0.3)' },
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          <Typography sx={{ color: '#FFE600', fontSize: '0.875rem', minWidth: 60, textAlign: 'center' }}>
            {pageNumber} / {numPages}
          </Typography>

          <IconButton
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            sx={{
              color: '#FFE600',
              '&.Mui-disabled': { color: 'rgba(255, 230, 0, 0.3)' },
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
});

PdfViewer.displayName = 'PdfViewer';

export default PdfViewer;
