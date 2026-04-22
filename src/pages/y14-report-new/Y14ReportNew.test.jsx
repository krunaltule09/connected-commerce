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
    Button: ({ children, onClick, ...props }) => React.createElement('button', { onClick, ...props }, children),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
    Stack: ({ children, ...props }) => React.createElement('div', props, children),
    Grow: ({ children }) => children,
    Fade: ({ children }) => children,
  };
});

jest.mock('@mui/icons-material', () => {
  const React = require('react');
  return {
    ExpandMore: () => null,
    InsertDriveFileOutlined: () => React.createElement('span', null, 'file'),
    PictureAsPdfOutlined: () => React.createElement('span', null, 'pdf'),
  };
});

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../../hooks', () => ({
  useButtonSound: () => jest.fn((fn) => fn),
}));

jest.mock('./Y14ReportNew.module.css', () => ({}));

jest.mock('../../components/common/GradientBorderBox', () => {
  const React = require('react');
  return ({ children }) => React.createElement('div', null, children);
});

jest.mock('../../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: {
      'Banking_Capital_Market_Operate_Table_EY_Logo.svg': '/logo.svg',
      'Banking_Capital_Market_Operate_Table_Background_Video': '/bg.mp4',
      'Banking_Capital_Market_Operate_Table_Warning_Icon.svg': '/warn.svg',
    },
  }),
  useVisualizationDataSet: (screen, viz) => {
    if (viz === 'Detailed Findings') return {
      findings: [{ title: 'Finding 1', section: 'Balance Sheet', usedFor: 'Compliance' }],
      warningMessage: 'Review needed',
    };
    if (viz === 'Schedule Template') return {
      title: 'FR Y-14 Schedule',
      sections: [{ name: 'Section A', status: 'complete' }],
      actions: [
        { label: 'Submit to Regulator' },
        { label: 'Save Drafts' },
        { label: 'Generate PDF' },
      ],
    };
    if (viz === 'Report Builder Workflow') return { title: 'Workflow Steps' };
    return {};
  },
}));

jest.mock('../../utils/tauriFetch', () => ({
  httpFetch: jest.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({}) }),
}));

jest.mock('../../components/y14-report/DetailedFindings', () => {
  const React = require('react');
  return ({ findings }) =>
    React.createElement('div', { 'data-testid': 'findings' }, `Findings: ${findings?.length || 0}`);
});

const React = require('react');
const { render, screen, act } = require('@testing-library/react');
const Y14ReportNew = require('./Y14ReportNew').default;

describe('Y14ReportNew', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('renders schedule template title', () => {
    render(React.createElement(Y14ReportNew));
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByText('FR Y-14 Schedule')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(React.createElement(Y14ReportNew));
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByText('Submit to Regulator')).toBeInTheDocument();
    expect(screen.getByText('Save Drafts')).toBeInTheDocument();
    expect(screen.getByText('Generate PDF')).toBeInTheDocument();
  });

  it('renders detailed findings', () => {
    render(React.createElement(Y14ReportNew));
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByTestId('findings')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(React.createElement(Y14ReportNew));
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });
});
