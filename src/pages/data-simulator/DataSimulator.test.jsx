jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: React.forwardRef(({ children, onClick, ...props }, ref) =>
      React.createElement('div', { onClick, ...props, ref }, children)
    ),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
    Button: ({ children, onClick, ...props }) => React.createElement('button', { onClick, ...props }, children),
    Stack: ({ children, ...props }) => React.createElement('div', props, children),
  };
});

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../../components/common/GradientBorderBoxLegacy', () => {
  const React = require('react');
  return ({ children }) => React.createElement('div', null, children);
});

jest.mock('../../components/common/GradientBorderBox', () => {
  const React = require('react');
  return ({ children }) => React.createElement('div', null, children);
});

jest.mock('../../hooks', () => ({
  useButtonSound: () => jest.fn((fn) => fn),
}));

jest.mock('./DataSimulator.module.css', () => ({}));

jest.mock('../../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: {
      'Banking_Capital_Market_Operate_Table_EY_Logo.svg': '/logo.svg',
      'Banking_Capital_Market_Operate_Table_Background_Video': '/bg.mp4',
    },
  }),
  useVisualizationDataSet: (screen, viz) => {
    if (viz === 'Page Header') return { title: 'Data Simulator', tabs: ['Speed', 'Accuracy', 'Compliance'] };
    if (viz === 'Speed Metrics') return { title: 'Speed', subtitle: 'Fast processing', before: '10s', after: '2s' };
    if (viz === 'Accuracy Metrics') return { title: 'Accuracy', metrics: [{ title: 'Precision', points: ['99% accuracy'] }] };
    if (viz === 'Compliance Alerts') return { title: 'Compliance', alerts: [{ title: 'Alert', details: [{ label: 'Status', value: 'OK' }] }] };
    return {};
  },
}));

const React = require('react');
const { render, screen } = require('@testing-library/react');
const DataSimulator = require('./DataSimulator').default;

describe('DataSimulator', () => {
  it('renders page title', () => {
    render(React.createElement(DataSimulator));
    expect(screen.getByText('Data Simulator')).toBeInTheDocument();
  });

  it('renders tab labels', () => {
    render(React.createElement(DataSimulator));
    const tabs = screen.getAllByText('Speed');
    expect(tabs.length).toBeGreaterThanOrEqual(1);
  });

  it('renders speed metrics', () => {
    render(React.createElement(DataSimulator));
    expect(screen.getByText('Fast processing')).toBeInTheDocument();
  });

  it('renders Back and Next buttons', () => {
    render(React.createElement(DataSimulator));
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });
});
