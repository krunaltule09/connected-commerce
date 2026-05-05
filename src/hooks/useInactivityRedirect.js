import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

/**
 * Redirects to home page after 5 minutes of no user interaction.
 * Listens for mouse, touch, keyboard, and scroll events.
 */
export default function useInactivityRedirect(homePath = '/') {
  const navigate = useNavigate();
  const location = useLocation();
  const timerRef = useRef(null);

  useEffect(() => {
    // Don't set timer if already on home page
    if (location.pathname === homePath) {
      return;
    }

    const resetTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        navigate(homePath);
      }, INACTIVITY_TIMEOUT);
    };

    const events = ['mousedown', 'mousemove', 'touchstart', 'touchmove', 'keydown', 'scroll', 'wheel'];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer, { passive: true });
    });

    // Start the timer
    resetTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [navigate, location.pathname, homePath]);
}
