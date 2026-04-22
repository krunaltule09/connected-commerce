const mockPost = jest.fn();

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    post: (...args) => mockPost(...args),
    create: jest.fn(() => ({ get: jest.fn(), post: jest.fn(), defaults: { baseURL: '' } })),
  },
}));

const navigationService = require('./NavigationService').default;

describe('NavigationService', () => {
  beforeEach(() => {
    mockPost.mockReset();
  });

  it('has correct appId', () => {
    expect(navigationService.appId).toBe('connected-commerce');
  });

  it('sends navigation event via axios post', async () => {
    mockPost.mockResolvedValue({ data: { success: true } });

    const result = await navigationService.sendNavigationEvent(
      'NAVIGATE',
      'operate-experience',
      '/welcome',
      { extra: 'data' }
    );

    expect(mockPost).toHaveBeenCalledWith(
      expect.stringContaining('/api/navigation'),
      expect.objectContaining({
        action: 'NAVIGATE',
        targetAppId: 'operate-experience',
        route: '/welcome',
      })
    );
    expect(result).toEqual({ success: true });
  });

  it('throws on axios error', async () => {
    mockPost.mockRejectedValue(new Error('Network error'));

    await expect(
      navigationService.sendNavigationEvent('NAVIGATE', 'target', '/route')
    ).rejects.toThrow('Network error');
  });

  it('navigateToOperateExperience sends to operate-experience', async () => {
    mockPost.mockResolvedValue({ data: { ok: true } });

    await navigationService.navigateToOperateExperience('/welcome', { test: true });

    expect(mockPost).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        action: 'NAVIGATE',
        targetAppId: 'operate-experience',
        route: '/welcome',
      })
    );
  });

  it('includes timestamp in event data', async () => {
    mockPost.mockResolvedValue({ data: {} });

    await navigationService.sendNavigationEvent('NAVIGATE', 'target', '/route');

    const payload = mockPost.mock.calls[0][1];
    expect(payload.data.timestamp).toBeDefined();
    expect(payload.data.sourceAppId).toBe('connected-commerce');
  });
});
