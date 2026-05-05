import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;

// Each rendered PDF page for the flipbook
const FlipPage = React.forwardRef((props, ref) => {
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
        {props.imageUrl ? (
          <img
            src={props.imageUrl}
            alt={`Page ${props.number + 1}`}
            style={{
              maxWidth: '98%',
              maxHeight: '98%',
              objectFit: 'contain',
            }}
          />
        ) : (
          <CircularProgress size={24} sx={{ color: '#FFE600' }} />
        )}
      </div>
    </div>
  );
});

/**
 * PdfFlipBook - Renders a PDF as a page-flip book.
 * Each PDF page is rendered to a canvas, converted to an image,
 * and displayed inside HTMLFlipBook for the flip animation.
 */
const PdfFlipBook = forwardRef(({ pdfUrl, onPageChange }, ref) => {
  const [numPages, setNumPages] = useState(null);
  const [pageImages, setPageImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const flipBookRef = useRef(null);

  // Expose navigation methods to parent
  useImperativeHandle(ref, () => ({
    flipNext: () => {
      if (flipBookRef.current && flipBookRef.current.pageFlip) {
        flipBookRef.current.pageFlip().flipNext();
      }
    },
    flipPrev: () => {
      if (flipBookRef.current && flipBookRef.current.pageFlip) {
        flipBookRef.current.pageFlip().flipPrev();
      }
    },
    getPageCount: () => numPages || 0,
  }), [numPages]);

  // Render all PDF pages to images once the document loads
  const onDocumentLoadSuccess = useCallback(async (pdf) => {
    const total = pdf.numPages;
    setNumPages(total);
    setError(null);

    const images = [];
    const renderWidth = 800; // render at good quality

    for (let i = 1; i <= total; i++) {
      try {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: renderWidth / page.getViewport({ scale: 1 }).width });

        const canvas = window.document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext('2d');

        await page.render({ canvasContext: context, viewport }).promise;
        images.push(canvas.toDataURL('image/png'));
      } catch (err) {
        console.error(`Failed to render PDF page ${i}:`, err);
        images.push(null);
      }
    }

    setPageImages(images);
    setLoading(false);
  }, []);

  const onDocumentLoadError = (err) => {
    console.error('PDF load error:', err);
    setError('Failed to load PDF document.');
    setLoading(false);
  };

  if (error) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Typography sx={{ color: '#ff6b6b', fontSize: '0.875rem' }}>{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Hidden Document loader - renders pages to images */}
      <div style={{ position: 'absolute', visibility: 'hidden', width: 0, height: 0, overflow: 'hidden' }}>
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading=""
        >
          <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} loading="" />
        </Document>
      </div>

      {loading && (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: 2,
        }}>
          <CircularProgress sx={{ color: '#FFE600' }} />
          <Typography sx={{ color: '#aaa', fontSize: '0.875rem' }}>
            Loading PDF pages...
          </Typography>
        </Box>
      )}

      {!loading && pageImages.length > 0 && (
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
          mobileScrollSupport={true}
          onFlip={(e) => onPageChange?.(e)}
          startPage={0}
          flippingTime={800}
          style={{
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
            margin: '0 auto',
          }}
        >
          {pageImages.map((imageUrl, index) => (
            <FlipPage key={index} number={index} imageUrl={imageUrl} />
          ))}
        </HTMLFlipBook>
      )}
    </Box>
  );
});

PdfFlipBook.displayName = 'PdfFlipBook';

export default PdfFlipBook;
