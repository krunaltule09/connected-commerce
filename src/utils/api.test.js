jest.mock('axios', () => {
  const mockInstance = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    defaults: { baseURL: '' },
  };
  return {
    __esModule: true,
    default: {
      create: jest.fn(() => mockInstance),
    },
    create: jest.fn(() => mockInstance),
  };
});

describe('api', () => {
  let api;

  beforeEach(() => {
    jest.resetModules();
    api = require('./api').default;
  });

  it('is an axios instance with get/post methods', () => {
    expect(api).toBeDefined();
    expect(typeof api.get).toBe('function');
    expect(typeof api.post).toBe('function');
  });

  it('calls axios.create', () => {
    const axios = require('axios');
    expect(axios.default.create).toHaveBeenCalled();
  });
});
