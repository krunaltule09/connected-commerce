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
    Box: React.forwardRef(({ children, onClick, ...props }, ref) =>
      React.createElement('div', { onClick, ...props, ref }, children)
    ),
    Button: ({ children, onClick, ...props }) => React.createElement('button', { onClick, ...props }, children),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
    Accordion: ({ children, ...props }) => React.createElement('div', props, children),
    AccordionSummary: ({ children, ...props }) => React.createElement('div', props, children),
    AccordionDetails: ({ children, ...props }) => React.createElement('div', props, children),
    Stack: ({ children, ...props }) => React.createElement('div', props, children),
    Grow: ({ children }) => children,
    Fade: ({ children }) => children,
  };
});

jest.mock('@mui/icons-material', () => {
  const React = require('react');
  return {
    ExpandMore: () => null,
    KeyboardArrowRight: () => null,
    FileDownload: () => null,
    Error: () => null,
    CheckCircle: () => React.createElement('span', null, 'check'),
    RadioButtonUnchecked: () => null,
  };
});

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../../components/common/GradientBorderBox', () => {
  const React = require('react');
  return ({ children }) => React.createElement('div', null, children);
});

jest.mock('../../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: {
      'Banking_Capital_Market_Operate_Table_EY_Logo.svg': '/logo.svg',
      'Banking_Capital_Market_Operate_Table_Background_Video': '/bg.mp4',
    },
  }),
  useVisualizationDataSet: (screen, viz) => {
    if (viz === 'Tab Labels') return { tabs: ['Summary', 'Details', 'Appendix'] };
    return {};
  },
}));

jest.mock('../../utils/tauriFetch', () => ({
  httpFetch: jest.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({}) }),
}));

jest.mock('./Y14ReportGeneration.module.css', () => ({}));

const React = require('react');
const { render, screen, act } = require('@testing-library/react');
const Y14ReportGeneration = require('./Y14ReportGeneration').default;

describe('Y14ReportGeneration', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('renders AI Draft Report Panel title', () => {
    render(React.createElement(Y14ReportGeneration));
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByText('AI Draft Report Panel')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(React.createElement(Y14ReportGeneration));
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByText('Submit to Regulator')).toBeInTheDocument();
    expect(screen.getByText('Save Drafts')).toBeInTheDocument();
    expect(screen.getByText('Generate PDF')).toBeInTheDocument();
  });

  it('renders accordion sections', () => {
    render(React.createElement(Y14ReportGeneration));
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByText('Balance Sheet')).toBeInTheDocument();
  });

  it('renders Report Builder Workflow', () => {
    render(React.createElement(Y14ReportGeneration));
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByText('Report Builder Workflow')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(React.createElement(Y14ReportGeneration));
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByText('Go back')).toBeInTheDocument();
    expect(screen.getByText('Next step')).toBeInTheDocument();
  });
});
