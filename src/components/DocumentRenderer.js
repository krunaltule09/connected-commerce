import React, { useState, useRef, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import PdfViewer from './PdfViewer';

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif'];

function getExtension(url) {
  if (!url) return '';
  try {
    const pathname = new URL(url, window.location.origin).pathname;
    const ext = pathname.split('.').pop().toLowerCase();
    return ext;
  } catch {
    const ext = url.split('.').pop().split('?')[0].toLowerCase();
    return ext;
  }
}

/**
 * DocumentRenderer - renders any document format (PDF, image) from a URL.
 *
 * Props:
 *   src       - URL of the document
 *   alt       - alt text (for images)
 *   mode      - "preview" (default) or "interactive"
 *   className - CSS class
 *   style     - inline styles
 *   sx        - MUI sx prop (passed to wrapper Box)
 *   ...rest   - additional props passed to <img> or wrapper
 */
export default function DocumentRenderer({ src, alt, mode = 'preview', pageNumber = 1, className, style, sx, ...rest }) {
  const ext = getExtension(src);
  const isPdf = ext === 'pdf';
  const isImage = IMAGE_EXTENSIONS.includes(ext);

  if (!src) return null;

  if (isPdf && mode === 'interactive') {
    return <PdfViewer pdfUrl={src} />;
  }

  if (isPdf && mode === 'preview') {
    return <PdfPreview src={src} pageNumber={pageNumber} className={className} style={style} sx={sx} />;
  }

  // Default: render as image (works for jpg, png, svg, webp, and unknown extensions)
  return (
    <Box
      component="img"
      src={src}
      alt={alt || 'Document'}
      className={className}
      style={style}
      sx={sx}
      {...rest}
    />
  );
}

function PdfPreview({ src, pageNumber = 1, className, style, sx }) {
  const [loading, setLoading] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);
  const renderWidth = 600;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scaleFactor = containerWidth > 0 ? containerWidth / renderWidth : 0.3;

  return (
    <Box
      ref={containerRef}
      className={className}
      style={style}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '0.5rem',
        ...sx,
      }}
    >
      {loading && (
        <CircularProgress
          size={24}
          sx={{ color: '#FFE600', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
        />
      )}
      <Box sx={{
        transformOrigin: 'top left',
        transform: `scale(${scaleFactor})`,
      }}>
        <Document
          file={src}
          onLoadSuccess={() => setLoading(false)}
          onLoadError={() => setLoading(false)}
          loading=""
        >
          <Page
            pageNumber={pageNumber}
            width={renderWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            loading=""
          />
        </Document>
      </Box>
    </Box>
  );
}
