import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useButtonSound } from './useButtonSound';

jest.mock('../context/SoundContext', () => ({
  useSoundContext: () => ({ soundEnabled: true }),
}));

jest.mock('../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: { 'Banking_Capital_Market_Operate_Table_Button_Click.mp3': '/click.mp3' },
  }),
}));

describe('useButtonSound', () => {
  it('returns a click handler', () => {
    const onClick = jest.fn();
    const { result } = renderHook(() => useButtonSound(onClick));
    expect(typeof result.current).toBe('function');
  });

  it('calls onClick on handler invocation', () => {
    const onClick = jest.fn();
    const { result } = renderHook(() => useButtonSound(onClick));

    act(() => {
      result.current({ type: 'click' });
    });

    expect(onClick).toHaveBeenCalledWith({ type: 'click' });
  });

  it('plays sound on click', () => {
    const { result } = renderHook(() => useButtonSound(jest.fn()));

    act(() => {
      result.current({});
    });

    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  it('works without onClick handler', () => {
    const { result } = renderHook(() => useButtonSound(null));

    expect(() => {
      act(() => {
        result.current({});
      });
    }).not.toThrow();
  });

  it('accepts custom soundPath', () => {
    const { result } = renderHook(() =>
      useButtonSound(jest.fn(), { soundPath: '/custom.mp3', volume: 0.3 })
    );
    expect(typeof result.current).toBe('function');
  });
});
