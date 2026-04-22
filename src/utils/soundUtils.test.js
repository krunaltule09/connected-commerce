import { playButtonSound, withButtonSound } from './soundUtils';

describe('playButtonSound', () => {
  it('creates Audio and plays with default volume', () => {
    playButtonSound({ soundPath: '/click.mp3' });
    // Audio mock from setupTests — play() is mocked
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  it('uses asset key when no soundPath', () => {
    const assets = { 'Banking_Capital_Market_Operate_Table_Button_Click.mp3': '/btn.mp3' };
    playButtonSound({ assets });
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  it('handles play rejection gracefully', () => {
    window.HTMLMediaElement.prototype.play = jest.fn().mockRejectedValue(new Error('blocked'));
    expect(() => playButtonSound({ soundPath: '/s.mp3' })).not.toThrow();
  });

  it('catches errors when Audio constructor fails', () => {
    const origAudio = global.Audio;
    global.Audio = jest.fn(() => { throw new Error('fail'); });
    expect(() => playButtonSound({ soundPath: '/s.mp3' })).not.toThrow();
    global.Audio = origAudio;
  });
});

describe('withButtonSound', () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(undefined);
  });

  it('returns a function', () => {
    const wrapped = withButtonSound(jest.fn());
    expect(typeof wrapped).toBe('function');
  });

  it('calls the original onClick', () => {
    const onClick = jest.fn();
    const handler = withButtonSound(onClick, { soundPath: '/s.mp3' });
    const event = { type: 'click' };
    handler(event);
    expect(onClick).toHaveBeenCalledWith(event);
  });

  it('plays sound on click', () => {
    const handler = withButtonSound(jest.fn(), { soundPath: '/s.mp3' });
    handler({});
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  it('works without onClick handler', () => {
    const handler = withButtonSound(null, { soundPath: '/s.mp3' });
    expect(() => handler({})).not.toThrow();
  });
});
