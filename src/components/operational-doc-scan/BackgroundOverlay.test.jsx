jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: ({ children, ...props }) => React.createElement('div', props, children),
  };
});

jest.mock('../../pages/operational-doc-scan/OperationalDocScan.module.css', () => ({
  backgroundOverlay: 'bg',
}));

jest.mock('../../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: { 'Banking_Capital_Market_Operate_Table_Background_Video': '/bg.mp4' },
  }),
}));

const React = require('react');
const { render } = require('@testing-library/react');
const BackgroundOverlay = require('./BackgroundOverlay').default;

describe('BackgroundOverlay', () => {
  it('renders without crashing', () => {
    const { container } = render(React.createElement(BackgroundOverlay));
    expect(container).toBeTruthy();
  });
});
