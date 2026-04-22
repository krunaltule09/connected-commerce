// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';

// Mock matchMedia for components that use media queries
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock HTMLMediaElement methods
window.HTMLMediaElement.prototype.load = jest.fn();
window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(undefined);
window.HTMLMediaElement.prototype.pause = jest.fn();

// Mock Canvas getContext for chart.js and lottie
HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  getImageData: jest.fn(() => ({ data: [] })),
  putImageData: jest.fn(),
  createImageData: jest.fn(() => []),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  fillText: jest.fn(),
  restore: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  stroke: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  measureText: jest.fn(() => ({ width: 0 })),
  transform: jest.fn(),
  rect: jest.fn(),
  clip: jest.fn(),
  createLinearGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
  createRadialGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
});

// Suppress noisy console output in tests
const originalError = console.error;
const originalWarn = console.warn;
const originalLog = console.log;
const originalDebug = console.debug;

beforeAll(() => {
  console.error = (...args) => {
    if (typeof args[0] === 'string' && (
      args[0].includes('Warning:') ||
      args[0].includes('act(') ||
      args[0].includes('Not implemented') ||
      args[0].includes('Error parsing message')
    )) return;
    originalError.call(console, ...args);
  };
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && (
      args[0].includes('Audio playback') ||
      args[0].includes('componentWillReceiveProps')
    )) return;
    originalWarn.call(console, ...args);
  };
  console.log = jest.fn();
  console.debug = jest.fn();
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
  console.log = originalLog;
  console.debug = originalDebug;
});
