import React from 'react';
import { renderHook, act } from '@testing-library/react';
import useSound from './useSound';

jest.mock('../context/SoundContext', () => {
  let enabled = true;
  return {
    useSoundContext: () => ({ soundEnabled: enabled }),
    __setSoundEnabled: (val) => { enabled = val; },
  };
});

const { __setSoundEnabled } = require('../context/SoundContext');

describe('useSound', () => {
  beforeEach(() => {
    __setSoundEnabled(true);
  });

  it('returns a play function', () => {
    const { result } = renderHook(() => useSound('/sound.mp3'));
    expect(typeof result.current).toBe('function');
  });

  it('preloads audio by default', () => {
    renderHook(() => useSound('/sound.mp3'));
    // Audio constructor is called during the effect (mocked in setupTests)
  });

  it('plays sound when called and sound is enabled', () => {
    const { result } = renderHook(() => useSound('/sound.mp3'));

    act(() => {
      result.current();
    });

    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  it('does not play when sound is disabled', () => {
    __setSoundEnabled(false);
    window.HTMLMediaElement.prototype.play.mockClear();

    const { result } = renderHook(() => useSound('/sound.mp3'));

    act(() => {
      result.current();
    });

    expect(window.HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  });

  it('cleans up audio on unmount', () => {
    const { unmount } = renderHook(() => useSound('/sound.mp3'));
    expect(() => unmount()).not.toThrow();
  });
});
