import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { SoundProvider, useSoundContext } from './SoundContext';
import { ConfigProvider } from './ConfigContext';

const mockConfig = {
  database: { screens: [] },
  assets: { 'Banking_Capital_Market_Operate_Table_Button_Click.mp3': '/click.mp3' },
};

const wrapper = ({ children }) => (
  <ConfigProvider config={mockConfig}>
    <SoundProvider>{children}</SoundProvider>
  </ConfigProvider>
);

describe('SoundContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults soundEnabled to true', () => {
    const { result } = renderHook(() => useSoundContext(), { wrapper });
    expect(result.current.soundEnabled).toBe(true);
  });

  it('toggles sound on/off', () => {
    const { result } = renderHook(() => useSoundContext(), { wrapper });

    act(() => {
      result.current.toggleSound();
    });

    expect(result.current.soundEnabled).toBe(false);

    act(() => {
      result.current.toggleSound();
    });

    expect(result.current.soundEnabled).toBe(true);
  });

  it('persists sound setting in localStorage', () => {
    const { result } = renderHook(() => useSoundContext(), { wrapper });

    act(() => {
      result.current.toggleSound();
    });

    expect(localStorage.getItem('soundEnabled')).toBe('false');
  });

  it('reads initial value from localStorage', () => {
    localStorage.setItem('soundEnabled', 'false');
    const { result } = renderHook(() => useSoundContext(), { wrapper });
    expect(result.current.soundEnabled).toBe(false);
  });

  it('provides default values outside provider', () => {
    const { result } = renderHook(() => useSoundContext());
    expect(result.current.soundEnabled).toBe(true);
    expect(typeof result.current.toggleSound).toBe('function');
  });
});
