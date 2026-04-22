import React from 'react';
import { renderHook } from '@testing-library/react';
import {
  ConfigProvider,
  useConfig,
  useAppDatabase,
  useScreenData,
  useVisualizationData,
  useScreenVisualizations,
  useVisualizationDataSet,
} from './ConfigContext';

const mockConfig = {
  database: {
    screens: [
      {
        screen_name: 'financial_dashboard',
        visualizations: [
          { name: 'Financial Metrics', data_set: { metrics: { Revenue: { dataPoints: [1, 2] } } } },
          { name: 'Covenant Status', data_set: { title: 'Covenants', covenants: [] } },
        ],
      },
      {
        screen_name: 'landing',
        visualizations: [{ name: 'Welcome', data_set: { title: 'Hello' } }],
      },
    ],
  },
  assets: { logo: '/logo.svg' },
};

const wrapper = ({ children }) => (
  <ConfigProvider config={mockConfig}>{children}</ConfigProvider>
);

describe('ConfigContext', () => {
  describe('useConfig', () => {
    it('returns the config object', () => {
      const { result } = renderHook(() => useConfig(), { wrapper });
      expect(result.current.assets).toEqual({ logo: '/logo.svg' });
      expect(result.current.database).toBeDefined();
    });

    it('throws when used outside ConfigProvider', () => {
      expect(() => {
        renderHook(() => useConfig());
      }).toThrow('useConfig must be used within a ConfigProvider');
    });
  });

  describe('useAppDatabase', () => {
    it('returns the database from config', () => {
      const { result } = renderHook(() => useAppDatabase(), { wrapper });
      expect(result.current.screens).toHaveLength(2);
    });
  });

  describe('useScreenData', () => {
    it('returns screen by name', () => {
      const { result } = renderHook(() => useScreenData('financial_dashboard'), { wrapper });
      expect(result.current.screen_name).toBe('financial_dashboard');
    });

    it('returns null for unknown screen', () => {
      const { result } = renderHook(() => useScreenData('nonexistent'), { wrapper });
      expect(result.current).toBeNull();
    });
  });

  describe('useVisualizationData', () => {
    it('returns visualization by screen and name', () => {
      const { result } = renderHook(
        () => useVisualizationData('financial_dashboard', 'Financial Metrics'),
        { wrapper }
      );
      expect(result.current.name).toBe('Financial Metrics');
    });

    it('returns null for unknown visualization', () => {
      const { result } = renderHook(
        () => useVisualizationData('financial_dashboard', 'Unknown'),
        { wrapper }
      );
      expect(result.current).toBeNull();
    });

    it('returns null for unknown screen', () => {
      const { result } = renderHook(
        () => useVisualizationData('bad_screen', 'Financial Metrics'),
        { wrapper }
      );
      expect(result.current).toBeNull();
    });
  });

  describe('useScreenVisualizations', () => {
    it('returns all visualizations for a screen', () => {
      const { result } = renderHook(
        () => useScreenVisualizations('financial_dashboard'),
        { wrapper }
      );
      expect(result.current).toHaveLength(2);
    });

    it('returns empty array for unknown screen', () => {
      const { result } = renderHook(
        () => useScreenVisualizations('unknown'),
        { wrapper }
      );
      expect(result.current).toEqual([]);
    });
  });

  describe('useVisualizationDataSet', () => {
    it('returns the data_set of a visualization', () => {
      const { result } = renderHook(
        () => useVisualizationDataSet('financial_dashboard', 'Covenant Status'),
        { wrapper }
      );
      expect(result.current.title).toBe('Covenants');
    });

    it('returns null for unknown visualization', () => {
      const { result } = renderHook(
        () => useVisualizationDataSet('financial_dashboard', 'Nope'),
        { wrapper }
      );
      expect(result.current).toBeNull();
    });
  });
});
