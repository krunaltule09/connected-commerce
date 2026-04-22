jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('../../hooks', () => ({
  useSound: () => jest.fn(),
}));

jest.mock('../../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: { 'Banking_Capital_Market_Operate_Table_Button_Click.mp3': '/sound.mp3' },
  }),
}));

const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const { default: WithButtonSound, SoundButton } = require('./WithButtonSound');

describe('WithButtonSound HOC', () => {
  it('renders wrapped component', () => {
    const Inner = React.forwardRef((props, ref) => React.createElement('div', { ref }, 'Inner'));
    const Wrapped = WithButtonSound(Inner);
    render(React.createElement(Wrapped));
    expect(screen.getByText('Inner')).toBeInTheDocument();
  });

  it('passes props through to wrapped component', () => {
    const Inner = React.forwardRef(({ label }, ref) => React.createElement('div', { ref }, label));
    const Wrapped = WithButtonSound(Inner);
    render(React.createElement(Wrapped, { label: 'Hello' }));
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('calls onClick on wrapped component click', () => {
    const onClick = jest.fn();
    const Inner = React.forwardRef((props, ref) =>
      React.createElement('button', { ...props, ref }, 'Click')
    );
    const Wrapped = WithButtonSound(Inner);
    render(React.createElement(Wrapped, { onClick }));
    fireEvent.click(screen.getByText('Click'));
    expect(onClick).toHaveBeenCalled();
  });
});

describe('SoundButton', () => {
  it('renders element with sound click', () => {
    const element = React.createElement('button', { onClick: jest.fn() }, 'Press');
    render(React.createElement(SoundButton, { element }));
    expect(screen.getByText('Press')).toBeInTheDocument();
  });

  it('handles null element', () => {
    const { container } = render(React.createElement(SoundButton, { element: null }));
    expect(container.innerHTML).toBe('');
  });
});
