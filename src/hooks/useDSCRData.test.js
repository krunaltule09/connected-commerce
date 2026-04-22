import { renderHook, waitFor } from '@testing-library/react';
import { useDSCRData } from './useDSCRData';

jest.mock('../utils/tauriFetch', () => ({
  httpFetch: jest.fn(),
}));

const { httpFetch } = require('../utils/tauriFetch');

describe('useDSCRData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns loading state initially', () => {
    httpFetch.mockReturnValue(new Promise(() => {})); // never resolves
    const { result } = renderHook(() => useDSCRData());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
  });

  it('fetches and maps DSCR data', async () => {
    httpFetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          data: {
            dataPoints: [
              { quarter: 'Q1', dscr: 1.8, period: 'FY 24-25', threshold: 1.1 },
            ],
          },
        }),
    });

    const { result } = renderHook(() => useDSCRData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual([
      { quarter: 'Q1', dscr: 1.8, period: 'FY 24-25', threshold: 1.1 },
    ]);
  });

  it('falls back to default data on error', async () => {
    httpFetch.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useDSCRData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toHaveLength(4);
    expect(result.current.data[0].quarter).toBe('Q1');
  });
});
