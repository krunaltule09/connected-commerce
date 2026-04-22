jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: new Proxy({}, {
      get: (_, tag) => React.forwardRef((props, ref) => {
        const { initial, animate, exit, variants, whileHover, whileTap, transition, layout, ...rest } = props;
        return React.createElement(tag, { ...rest, ref });
      }),
    }),
  };
});

jest.mock('../CovenantStatusSection', () => {
  const React = require('react');
  return () => React.createElement('div', { 'data-testid': 'covenant-section' });
});

const React = require('react');
const { render, screen } = require('@testing-library/react');
const CovenantStatusWrapper = require('./CovenantStatusWrapper').default;

describe('CovenantStatusWrapper', () => {
  it('renders CovenantStatusSection', () => {
    render(React.createElement(CovenantStatusWrapper));
    expect(screen.getByTestId('covenant-section')).toBeInTheDocument();
  });
});
