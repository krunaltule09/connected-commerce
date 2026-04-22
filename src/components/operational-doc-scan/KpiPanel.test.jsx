jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: new Proxy({}, {
      get: (_, tag) => React.forwardRef((props, ref) => {
        const { initial, animate, exit, variants, whileHover, whileTap, transition, layout, ...rest } = props;
        return React.createElement(tag, { ...rest, ref });
      }),
    }),
    AnimatePresence: ({ children }) => children,
  };
});

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: ({ children, ...props }) => React.createElement('div', props, children),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
    Collapse: ({ children, in: show }) => (show !== false ? children : null),
    Zoom: ({ children }) => children,
    Grow: ({ children }) => children,
  };
});

jest.mock('@mui/icons-material', () => ({
  FilterList: () => null,
}));

jest.mock('../common/GradientBorderBox', () => {
  const React = require('react');
  return ({ children }) => React.createElement('div', { 'data-testid': 'gradient-box' }, children);
});

jest.mock('../common/GradientButton', () => {
  const React = require('react');
  return ({ children, onClick }) => React.createElement('button', { onClick }, children);
});

jest.mock('../../pages/operational-doc-scan/OperationalDocScan.module.css', () => ({}));

const React = require('react');
const { render, screen } = require('@testing-library/react');
const KpiPanel = require('./KpiPanel').default;

describe('KpiPanel', () => {
  it('renders "Operational KPIs" title', () => {
    render(React.createElement(KpiPanel, {
      revealStage: 4,
      scanProgress: 100,
      activeTab: 'delivery',
      handleTabChange: jest.fn(),
    }));
    expect(screen.getByText('Operational KPIs')).toBeInTheDocument();
  });

  it('renders On-Time Delivery metric', () => {
    render(React.createElement(KpiPanel, {
      revealStage: 4,
      scanProgress: 100,
      activeTab: 'delivery',
      handleTabChange: jest.fn(),
    }));
    expect(screen.getByText('On-Time Delivery')).toBeInTheDocument();
  });

  it('renders filter buttons', () => {
    render(React.createElement(KpiPanel, {
      revealStage: 4,
      scanProgress: 100,
      activeTab: 'delivery',
      handleTabChange: jest.fn(),
    }));
    const filterBtns = screen.getAllByText(/Filter by/);
    expect(filterBtns.length).toBeGreaterThanOrEqual(1);
  });
});
