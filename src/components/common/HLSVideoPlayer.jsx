import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HLSVideoPlayer = ({ src, className, autoPlay = true, loop = true, muted = true, playsInline = true }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    // Check if HLS is supported
    if (Hls.isSupported()) {
      // Create HLS instance
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 90,
        maxBufferLength: 30,
        maxMaxBufferLength: 600,
        maxBufferSize: 60 * 1000 * 1000,
        maxBufferHole: 0.5,
      });

      hlsRef.current = hls;

      // Bind video element
      hls.attachMedia(video);

      // Load source
      hls.loadSource(src);

      // Handle events
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) {
          video.play().catch(err => {
            console.warn('Autoplay prevented:', err);
          });
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error('HLS Network error, trying to recover...');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error('HLS Media error, trying to recover...');
              hls.recoverMediaError();
              break;
            default:
              console.error('HLS Fatal error, cannot recover');
              hls.destroy();
              break;
          }
        }
      });

      // Cleanup
      return () => {
        if (hls) {
          hls.destroy();
        }
      };
    } 
    // Check if browser natively supports HLS (Safari)
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      if (autoPlay) {
        video.play().catch(err => {
          console.warn('Autoplay prevented:', err);
        });
      }
    } else {
      console.error('HLS is not supported in this browser');
    }
  }, [src, autoPlay]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
};

export default HLSVideoPlayer;
