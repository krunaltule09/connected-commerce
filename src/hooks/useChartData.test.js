import { renderHook, act } from '@testing-library/react';
import { useChartData } from './useChartData';

// Mock requestAnimationFrame/cancelAnimationFrame globally
let rafCallbacks = [];
let rafId = 0;

beforeEach(() => {
  rafCallbacks = [];
  rafId = 0;
  global.requestAnimationFrame = jest.fn((cb) => {
    const id = ++rafId;
    rafCallbacks.push({ id, cb });
    return id;
  });
  global.cancelAnimationFrame = jest.fn((id) => {
    rafCallbacks = rafCallbacks.filter((r) => r.id !== id);
  });
});

afterEach(() => {
  delete global.requestAnimationFrame;
  delete global.cancelAnimationFrame;
});

const flushRAF = () => {
  const cbs = [...rafCallbacks];
  rafCallbacks = [];
  cbs.forEach(({ cb }) => cb());
};

const mockData = [
  ['Q1', 100],
  ['Q2', 200],
  ['Q3', 300],
  ['Q4', 400],
];

describe('useChartData', () => {
  it('returns initial state with zero animation progress', () => {
    const { result } = renderHook(() => useChartData(mockData, false, 'Revenue'));
    expect(result.current.animationProgress).toBe(0);
    expect(result.current.isAnimating).toBe(true);
  });

  it('extracts labels from data', () => {
    const { result } = renderHook(() => useChartData(mockData, false, 'Revenue'));
    expect(result.current.labels).toEqual(['Q1', 'Q2', 'Q3', 'Q4']);
  });

  it('starts animation when isReady is true', () => {
    const { result } = renderHook(() => useChartData(mockData, true, 'Revenue'));

    // Should have requested animation frame
    expect(global.requestAnimationFrame).toHaveBeenCalled();
  });

  it('returns visible data array of correct length', () => {
    const { result } = renderHook(() => useChartData(mockData, false, 'Revenue'));
    expect(result.current.visibleData).toHaveLength(4);
  });

  it('does not animate when isReady is false', () => {
    renderHook(() => useChartData(mockData, false, 'Revenue'));
    expect(global.requestAnimationFrame).not.toHaveBeenCalled();
  });

  it('resets animation when metricKey changes', () => {
    const { result, rerender } = renderHook(
      ({ metric }) => useChartData(mockData, true, metric),
      { initialProps: { metric: 'Revenue' } }
    );

    rerender({ metric: 'EBITDA' });
    expect(result.current.animationProgress).toBe(0);
  });
});
