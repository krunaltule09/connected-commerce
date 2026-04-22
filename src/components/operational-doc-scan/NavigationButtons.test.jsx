jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: ({ children, ...props }) => React.createElement('div', props, children),
    Slide: ({ children }) => children,
  };
});

jest.mock('../../pages/operational-doc-scan/OperationalDocScan.module.css', () => ({}));

const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const NavigationButtons = require('./NavigationButtons').default;

describe('NavigationButtons', () => {
  it('renders Back and Next buttons', () => {
    render(React.createElement(NavigationButtons, {
      handleGoBack: jest.fn(),
      handleNextStep: jest.fn(),
      nextButtonEnabled: true,
    }));
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('calls handleGoBack on Back click', () => {
    const goBack = jest.fn();
    render(React.createElement(NavigationButtons, {
      handleGoBack: goBack,
      handleNextStep: jest.fn(),
      nextButtonEnabled: true,
    }));
    fireEvent.click(screen.getByText('Back'));
    expect(goBack).toHaveBeenCalled();
  });

  it('calls handleNextStep on Next click', () => {
    const next = jest.fn();
    render(React.createElement(NavigationButtons, {
      handleGoBack: jest.fn(),
      handleNextStep: next,
      nextButtonEnabled: true,
    }));
    fireEvent.click(screen.getByText('Next'));
    expect(next).toHaveBeenCalled();
  });
});
