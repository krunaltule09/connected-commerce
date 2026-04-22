import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { FinancialDataProvider, useFinancialData } from './FinancialDataContext';

jest.mock('../data/database', () => ({
  screens: [
    {
      screen_name: 'financial_dashboard',
      visualizations: [
        {
          name: 'Financial Metrics',
          data_set: {
            metrics: {
              Revenue: {
                dataPoints: [['Q1', 10], ['Q2', 20]],
                infoLines: ['Line 1'],
                unit: 'M',
              },
              EBITDA: {
                dataPoints: [['Q1', 5], ['Q2', 8]],
                infoLines: ['EBITDA info'],
                unit: 'M',
              },
            },
          },
        },
      ],
    },
  ],
}));

const wrapper = ({ children }) => <FinancialDataProvider>{children}</FinancialDataProvider>;

describe('FinancialDataContext', () => {
  it('provides default selected metric as Revenue', () => {
    const { result } = renderHook(() => useFinancialData(), { wrapper });
    expect(result.current.selectedMetric).toBe('Revenue');
  });

  it('returns available metrics', () => {
    const { result } = renderHook(() => useFinancialData(), { wrapper });
    expect(result.current.metrics).toContain('Revenue');
    expect(result.current.metrics).toContain('EBITDA');
  });

  it('returns data for selected metric', () => {
    const { result } = renderHook(() => useFinancialData(), { wrapper });
    const data = result.current.getSelectedData();
    expect(data).toEqual([['Q1', 10], ['Q2', 20]]);
  });

  it('returns info lines for selected metric', () => {
    const { result } = renderHook(() => useFinancialData(), { wrapper });
    const lines = result.current.getInfoLines();
    expect(lines).toEqual(['Line 1']);
  });

  it('formats value with unit', () => {
    const { result } = renderHook(() => useFinancialData(), { wrapper });
    expect(result.current.formatValue(100)).toBe('$100M');
  });

  it('changes selected metric', () => {
    const { result } = renderHook(() => useFinancialData(), { wrapper });

    act(() => {
      result.current.setSelectedMetric('EBITDA');
    });

    expect(result.current.selectedMetric).toBe('EBITDA');
    expect(result.current.getInfoLines()).toEqual(['EBITDA info']);
  });

  it('returns isLoading as false', () => {
    const { result } = renderHook(() => useFinancialData(), { wrapper });
    expect(result.current.isLoading).toBe(false);
  });

  it('throws when used outside provider', () => {
    expect(() => {
      renderHook(() => useFinancialData());
    }).toThrow('useFinancialData must be used within a FinancialDataProvider');
  });
});
