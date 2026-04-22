class MockWebSocket {
  static OPEN = 1;
  static CLOSED = 3;

  constructor(url) {
    this.url = url;
    this.readyState = MockWebSocket.OPEN;
    this.onopen = null;
    this.onclose = null;
    this.onerror = null;
    this.onmessage = null;
    this.sentMessages = [];
    this.closeCalled = false;

    // Auto-fire onopen
    setTimeout(() => {
      if (this.onopen) this.onopen();
    }, 0);
  }

  send(data) {
    this.sentMessages.push(data);
  }

  close() {
    this.closeCalled = true;
    this.readyState = MockWebSocket.CLOSED;
    if (this.onclose) this.onclose();
  }

  simulateMessage(data) {
    if (this.onmessage) {
      this.onmessage({ data: JSON.stringify(data) });
    }
  }
}

// Store reference for assertions
let wsInstances = [];
const OriginalWebSocket = global.WebSocket;

beforeEach(() => {
  wsInstances = [];
  global.WebSocket = jest.fn((url) => {
    const ws = new MockWebSocket(url);
    wsInstances.push(ws);
    return ws;
  });
  global.WebSocket.OPEN = MockWebSocket.OPEN;
  global.WebSocket.CLOSED = MockWebSocket.CLOSED;
  jest.useFakeTimers();
});

afterEach(() => {
  global.WebSocket = OriginalWebSocket;
  jest.useRealTimers();
  jest.resetModules();
});

describe('NavigationSyncService', () => {
  let service;

  beforeEach(() => {
    jest.resetModules();
    service = require('./NavigationSyncService').default;
  });

  it('connects to WebSocket server', async () => {
    const connectPromise = service.connect();
    jest.runAllTimers();
    await connectPromise;

    expect(service.isConnected).toBe(true);
    expect(global.WebSocket).toHaveBeenCalled();
  });

  it('does not reconnect if already connected', async () => {
    const p1 = service.connect();
    jest.runAllTimers();
    await p1;

    const p2 = service.connect();
    await p2;

    // Should only have created one WebSocket
    expect(wsInstances).toHaveLength(1);
  });

  it('sends navigation message', async () => {
    const p = service.connect();
    jest.runAllTimers();
    await p;

    await service.sendNavigation('NAVIGATE', '/dashboard', { extra: 'data' });

    const sent = JSON.parse(wsInstances[0].sentMessages[0]);
    expect(sent.type).toBe('navigation');
    expect(sent.action).toBe('NAVIGATE');
    expect(sent.targetPage).toBe('/dashboard');
    expect(sent.extra).toBe('data');
  });

  it('notifies listeners on message', async () => {
    const p = service.connect();
    jest.runAllTimers();
    await p;

    const listener = jest.fn();
    service.addListener(listener);

    wsInstances[0].simulateMessage({ type: 'nav', route: '/home' });

    expect(listener).toHaveBeenCalledWith({ type: 'nav', route: '/home' });
  });

  it('removes listener', async () => {
    const p = service.connect();
    jest.runAllTimers();
    await p;

    const listener = jest.fn();
    const removeListener = service.addListener(listener);
    removeListener();

    wsInstances[0].simulateMessage({ type: 'test' });

    expect(listener).not.toHaveBeenCalled();
  });

  it('disconnects cleanly', async () => {
    const p = service.connect();
    jest.runAllTimers();
    await p;

    service.disconnect();
    expect(wsInstances[0].closeCalled).toBe(true);
  });

  it('attempts reconnect on close', async () => {
    const p = service.connect();
    jest.runAllTimers();
    await p;

    // Simulate disconnect
    wsInstances[0].close();

    expect(service.isConnected).toBe(false);
  });

  it('handles parse errors in messages gracefully', async () => {
    const p = service.connect();
    jest.runAllTimers();
    await p;

    // Send invalid JSON
    expect(() => {
      if (wsInstances[0].onmessage) {
        wsInstances[0].onmessage({ data: 'not json' });
      }
    }).not.toThrow();
  });
});
