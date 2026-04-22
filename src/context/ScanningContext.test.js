import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { ScanningProvider, useScanning } from './ScanningContext';

jest.mock('../utils/tauriFetch', () => ({
  httpFetch: jest.fn().mockResolvedValue({ ok: true }),
}));

const wrapper = ({ children }) => <ScanningProvider>{children}</ScanningProvider>;

describe('ScanningContext', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('provides initial scanning state', () => {
    const { result } = renderHook(() => useScanning(), { wrapper });
    expect(result.current.scanProgress).toBe(0);
    expect(result.current.isFinancialDataReady).toBe(false);
    expect(result.current.isCovenantDataReady).toBe(false);
    expect(result.current.isComplete).toBe(false);
  });

  it('increments scan progress over time', () => {
    const { result } = renderHook(() => useScanning(), { wrapper });

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(result.current.scanProgress).toBeGreaterThan(0);
  });

  it('sets isFinancialDataReady when progress >= 60', () => {
    const { result } = renderHook(() => useScanning(), { wrapper });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.scanProgress).toBeGreaterThanOrEqual(60);
    expect(result.current.isFinancialDataReady).toBe(true);
  });

  it('sets isCovenantDataReady when progress >= 85', () => {
    const { result } = renderHook(() => useScanning(), { wrapper });

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(result.current.scanProgress).toBeGreaterThanOrEqual(85);
    expect(result.current.isCovenantDataReady).toBe(true);
  });

  it('caps progress at 100', () => {
    const { result } = renderHook(() => useScanning(), { wrapper });

    act(() => {
      jest.advanceTimersByTime(30000);
    });

    expect(result.current.scanProgress).toBeLessThanOrEqual(100);
    expect(result.current.isComplete).toBe(true);
  });

  it('resets on reset-scanning-progress event', () => {
    const { result } = renderHook(() => useScanning(), { wrapper });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.scanProgress).toBeGreaterThan(0);

    act(() => {
      window.dispatchEvent(new Event('reset-scanning-progress'));
    });

    expect(result.current.scanProgress).toBe(0);
    expect(result.current.isFinancialDataReady).toBe(false);
    expect(result.current.isCovenantDataReady).toBe(false);
  });

  it('throws when used outside provider', () => {
    // useScanning checks for undefined context
    expect(() => {
      renderHook(() => useScanning());
    }).toThrow('useScanning must be used within a ScanningProvider');
  });
});
