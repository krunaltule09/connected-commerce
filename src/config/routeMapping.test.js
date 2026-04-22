import ROUTE_MAPPING from './routeMapping';

describe('routeMapping', () => {
  it('maps / to /welcome', () => {
    expect(ROUTE_MAPPING['/']).toBe('/welcome');
  });

  it('maps /explore to /personal-welcome', () => {
    expect(ROUTE_MAPPING['/explore']).toBe('/personal-welcome');
  });

  it('maps /financial-dashboard to /financial-statement', () => {
    expect(ROUTE_MAPPING['/financial-dashboard']).toBe('/financial-statement');
  });

  it('maps /anomaly-detection to /dscr-trend', () => {
    expect(ROUTE_MAPPING['/anomaly-detection']).toBe('/dscr-trend');
  });

  it('maps /y14-report to /y14-report/large', () => {
    expect(ROUTE_MAPPING['/y14-report']).toBe('/y14-report/large');
  });

  it('maps /operational-doc-scan to /covenant-monitoring', () => {
    expect(ROUTE_MAPPING['/operational-doc-scan']).toBe('/covenant-monitoring');
  });

  it('maps /document-centre to /loan-service', () => {
    expect(ROUTE_MAPPING['/document-centre']).toBe('/loan-service');
  });

  it('maps /data-simulator to /benefits-summary', () => {
    expect(ROUTE_MAPPING['/data-simulator']).toBe('/benefits-summary');
  });

  it('returns undefined for unmapped routes', () => {
    expect(ROUTE_MAPPING['/nonexistent']).toBeUndefined();
  });
});
