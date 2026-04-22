import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    create: jest.fn(() => ({ get: jest.fn(), post: jest.fn(), defaults: { baseURL: '' } })),
  },
}));

jest.mock('./utils/tauriFetch', () => ({
  httpFetch: jest.fn(),
}));

jest.mock('./data/database', () => ({
  screens: [
    {
      screen_name: 'financial_dashboard',
      visualizations: [
        { name: 'Financial Metrics', data_set: { metrics: {} } },
      ],
    },
  ],
}));

jest.mock('./App.css', () => ({}));

jest.mock('./pages', () => ({
  LandingPage: () => <div>LandingPage</div>,
  FinancialDashboard: () => <div>FinancialDashboard</div>,
  EnterpriseLoanServicing: () => <div>EnterpriseLoanServicing</div>,
}));

jest.mock('./pages/DocumentCentrePage', () => () => <div>DocumentCentre</div>);
jest.mock('./pages/AnomalyDetection', () => () => <div>AnomalyDetection</div>);
jest.mock('./pages/operational-doc-scan/OperationalDocScan', () => () => <div>OpDocScan</div>);
jest.mock('./pages/FeedbackPage', () => () => <div>Feedback</div>);
jest.mock('./pages/y14-report-new/Y14ReportNew', () => () => <div>Y14</div>);
jest.mock('./pages/data-simulator/DataSimulator', () => () => <div>DataSim</div>);

import App from './App';

const { httpFetch } = require('./utils/tauriFetch');

describe('App', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows loading screen before config is loaded', () => {
    httpFetch.mockReturnValue(new Promise(() => {}));

    render(<App />);
    expect(screen.getByText('Connecting to Server...')).toBeInTheDocument();
    expect(screen.getByText('Fetching configuration...')).toBeInTheDocument();
  });

  it('renders the app after all config is loaded', async () => {
    httpFetch.mockImplementation((url) => {
      if (url.includes('/api/animations')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [{ animated_image: [{ name: 'anim1', url: '/a.json' }] }] }),
        });
      }
      if (url.includes('/api/images')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [{ image: [{ name: 'img1', url: '/i.png' }] }] }),
        });
      }
      if (url.includes('/api/audios')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [{ audio: [{ name: 'aud1', url: '/a.mp3' }] }] }),
        });
      }
      if (url.includes('/streaming-service/streaming-url')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [{ title: 'vid1', lq_streaming_url: '/v.m3u8' }] }),
        });
      }
      return Promise.resolve({ ok: false });
    });

    await act(async () => {
      render(<App />);
    });

    await act(async () => {
      for (let i = 0; i < 10; i++) await Promise.resolve();
    });

    await waitFor(() => {
      expect(screen.queryByText('Connecting to Server...')).not.toBeInTheDocument();
    });
  });

  it('handles fetch errors gracefully', async () => {
    httpFetch.mockRejectedValue(new Error('Network error'));

    render(<App />);

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByText('Connecting to Server...')).toBeInTheDocument();
  });

  it('handles non-ok response', async () => {
    httpFetch.mockResolvedValue({ ok: false });

    render(<App />);

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByText('Connecting to Server...')).toBeInTheDocument();
  });

  it('retries fetching on interval', async () => {
    httpFetch.mockResolvedValue({ ok: false });

    render(<App />);

    await act(async () => {
      await Promise.resolve();
    });

    const initialCalls = httpFetch.mock.calls.length;

    await act(async () => {
      jest.advanceTimersByTime(5000);
      await Promise.resolve();
    });

    expect(httpFetch.mock.calls.length).toBeGreaterThan(initialCalls);
  });
});
