import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HLSVideoPlayer = ({
  src,
  className,
  style,
  onLoadedData,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const hasNotifiedLoadedRef = useRef(false);
  const lastSrcRef = useRef('');
  const hlsDestroyTimeoutRef = useRef(null);

  console.log('HLSVideoPlayer rendered with src:', src);

  // Keep onLoadedData in a ref to prevent effect from re-running when function reference changes
  const onLoadedDataRef = useRef(onLoadedData);
  useEffect(() => {
    onLoadedDataRef.current = onLoadedData;
  }, [onLoadedData]);

  useEffect(() => {
    const video = videoRef.current;
    console.log('HLSVideoPlayer useEffect triggered for src:', src, 'video element status:', !!video);
    if (!video || !src) return;

    // Clear any pending destruction timeout
    if (hlsDestroyTimeoutRef.current) {
      clearTimeout(hlsDestroyTimeoutRef.current);
      hlsDestroyTimeoutRef.current = null;
    }

    hasNotifiedLoadedRef.current = false;

    const notifyLoaded = () => {
      if (hasNotifiedLoadedRef.current) {
        return;
      }
      hasNotifiedLoadedRef.current = true;
      if (typeof onLoadedDataRef.current === 'function') {
        onLoadedDataRef.current();
      }
    };

    const handleLoaded = () => {
      notifyLoaded();
    };

    video.addEventListener('loadeddata', handleLoaded);
    video.addEventListener('canplay', handleLoaded);

    let hls = hlsRef.current;

    // If the source changed, destroy the old HLS instance
    if (hls && (lastSrcRef.current !== src || hls.media !== video)) {
      console.log('HLSVideoPlayer: Source or video element changed, destroying old Hls instance...');
      hls.destroy();
      hls = null;
      hlsRef.current = null;
    }

    lastSrcRef.current = src;

    // Check if HLS is supported
    if (Hls.isSupported()) {
      if (!hls) {
        console.log('HLSVideoPlayer: Initializing new Hls instance...');
        hls = new Hls({
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
          notifyLoaded();
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
      } else {
        console.log('HLSVideoPlayer: Reusing existing Hls instance for same source...');
      }

      // Cleanup
      return () => {
        console.log('HLSVideoPlayer useEffect cleanup for src:', src);
        video.removeEventListener('loadeddata', handleLoaded);
        video.removeEventListener('canplay', handleLoaded);
        
        // Delay destruction to avoid cancelling request during StrictMode double-mount
        const currentHls = hls;
        hlsDestroyTimeoutRef.current = setTimeout(() => {
          if (hlsRef.current === currentHls) {
            console.log('HLSVideoPlayer: Destroying Hls instance after timeout');
            currentHls.destroy();
            hlsRef.current = null;
          }
        }, 50);
      };
    } 
    // Check if browser natively supports HLS (Safari)
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      console.log('HLSVideoPlayer: Using native HLS support...');
      video.src = src;
      notifyLoaded();
      if (autoPlay) {
        video.play().catch(err => {
          console.warn('Autoplay prevented:', err);
        });
      }
    } else {
      console.error('HLS is not supported in this browser');
    }

    return () => {
      console.log('HLSVideoPlayer useEffect native cleanup for src:', src);
      video.removeEventListener('loadeddata', handleLoaded);
      video.removeEventListener('canplay', handleLoaded);
    };
  }, [src, autoPlay]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      style={style || { width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
};

export default HLSVideoPlayer;
