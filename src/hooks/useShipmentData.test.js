import { renderHook, act } from '@testing-library/react';
import { useShipmentData } from './useShipmentData';

describe('useShipmentData', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns initial state', () => {
    const { result } = renderHook(() => useShipmentData());

    expect(result.current.scanProgress).toBe(0);
    expect(result.current.isScanning).toBe(true);
    expect(result.current.scanComplete).toBe(false);
    expect(result.current.revealStage).toBe(0);
    expect(result.current.shipments).toHaveLength(8);
  });

  it('increments progress over time', () => {
    const { result } = renderHook(() => useShipmentData());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.scanProgress).toBeGreaterThan(0);
  });

  it('enters first reveal stage', () => {
    const { result } = renderHook(() => useShipmentData());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.revealStage).toBeGreaterThanOrEqual(1);
  });

  it('completes at 100%', () => {
    const { result } = renderHook(() => useShipmentData());

    act(() => {
      jest.advanceTimersByTime(9000);
    });

    expect(result.current.scanProgress).toBe(100);
    expect(result.current.scanComplete).toBe(true);
    expect(result.current.isScanning).toBe(false);
    expect(result.current.revealStage).toBe(4);
  });

  it('provides resetScan function', () => {
    const { result } = renderHook(() => useShipmentData());

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    act(() => {
      result.current.resetScan();
    });

    expect(result.current.scanProgress).toBe(0);
    expect(result.current.revealStage).toBe(0);
    expect(result.current.scanComplete).toBe(false);
  });

  it('has correct shipment data structure', () => {
    const { result } = renderHook(() => useShipmentData());
    const firstShipment = result.current.shipments[0];

    expect(firstShipment).toHaveProperty('name');
    expect(firstShipment).toHaveProperty('promisedDate');
    expect(firstShipment).toHaveProperty('actualDate');
    expect(firstShipment).toHaveProperty('status');
  });
});
