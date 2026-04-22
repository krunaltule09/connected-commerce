import React from 'react';
import { render } from '@testing-library/react';

jest.mock('hls.js', () => {
  const Hls = function() {
    this.loadSource = jest.fn();
    this.attachMedia = jest.fn();
    this.on = jest.fn();
    this.destroy = jest.fn();
  };
  Hls.isSupported = jest.fn(() => true);
  Hls.Events = { MANIFEST_PARSED: 'hlsManifestParsed', ERROR: 'hlsError' };
  Hls.ErrorTypes = { NETWORK_ERROR: 'networkError', MEDIA_ERROR: 'mediaError' };
  return { __esModule: true, default: Hls };
});

import HLSVideoPlayer from './HLSVideoPlayer';

describe('HLSVideoPlayer', () => {
  it('renders a video element', () => {
    const { container } = render(<HLSVideoPlayer src="http://example.com/video.m3u8" />);
    expect(container.querySelector('video')).toBeInTheDocument();
  });

  it('sets autoPlay and loop by default', () => {
    const { container } = render(<HLSVideoPlayer src="/v.m3u8" />);
    const video = container.querySelector('video');
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('loop');
  });

  it('applies className and style', () => {
    const { container } = render(
      <HLSVideoPlayer src="/v.m3u8" className="my-video" style={{ border: '1px solid red' }} />
    );
    const video = container.querySelector('video');
    expect(video).toHaveClass('my-video');
  });

  it('renders without crashing when src is empty', () => {
    const { container } = render(<HLSVideoPlayer src="" />);
    expect(container.querySelector('video')).toBeInTheDocument();
  });
});
