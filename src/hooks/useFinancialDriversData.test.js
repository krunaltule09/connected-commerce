import { renderHook, waitFor } from '@testing-library/react';
import { useFinancialDriversData } from './useFinancialDriversData';

jest.mock('../utils/tauriFetch', () => ({
  httpFetch: jest.fn(),
}));

const { httpFetch } = require('../utils/tauriFetch');

describe('useFinancialDriversData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns initial state with zeroed data', () => {
    httpFetch.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useFinancialDriversData());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toHaveLength(4);
    expect(result.current.data[0].cashFlow).toBe(0);
  });

  it('fetches and maps data from API', async () => {
    httpFetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          data: {
            dataPoints: [
              { quarter: 'Q1', cashFlow: 15000, interest: 15000, debt: 15000 },
            ],
          },
        }),
    });

    const { result } = renderHook(() => useFinancialDriversData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual([
      { quarter: 'Q1', cashFlow: 15000, interest: 15000, debt: 15000 },
    ]);
  });

  it('falls back to default data on error', async () => {
    httpFetch.mockRejectedValue(new Error('fail'));

    const { result } = renderHook(() => useFinancialDriversData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toHaveLength(4);
    expect(result.current.data[0].quarter).toBe('Q1');
    expect(result.current.data[0].cashFlow).toBe(15000);
  });
});
