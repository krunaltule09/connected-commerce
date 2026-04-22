jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

let mockPlay = jest.fn();
jest.mock('../../hooks', () => ({
  useSound: () => ({ play: mockPlay }),
}));

jest.mock('../../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: { 'Banking_Capital_Market_Operate_Table_Button_Sound.mp3': '/sound.mp3' },
  }),
}));

const React = require('react');
const { render } = require('@testing-library/react');
const ButtonSound = require('./ButtonSound').default;

describe('ButtonSound', () => {
  beforeEach(() => {
    mockPlay.mockClear();
  });

  it('renders without crashing', () => {
    const { container } = render(React.createElement(ButtonSound));
    expect(container).toBeTruthy();
  });

  it('attaches click listener to document', () => {
    const addSpy = jest.spyOn(document, 'addEventListener');
    render(React.createElement(ButtonSound));
    expect(addSpy).toHaveBeenCalledWith('click', expect.any(Function));
    addSpy.mockRestore();
  });

  it('removes click listener on unmount', () => {
    const removeSpy = jest.spyOn(document, 'removeEventListener');
    const { unmount } = render(React.createElement(ButtonSound));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('click', expect.any(Function));
    removeSpy.mockRestore();
  });
});
