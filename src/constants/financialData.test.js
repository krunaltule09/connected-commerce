const { FINANCIAL_METRICS, METRIC_UNITS, formatMetricValue } = require('./financialData');

describe('financialData constants', () => {
  it('exports FINANCIAL_METRICS with all 5 metrics', () => {
    expect(FINANCIAL_METRICS).toHaveProperty('Revenue');
    expect(FINANCIAL_METRICS).toHaveProperty('EBITDA');
    expect(FINANCIAL_METRICS).toHaveProperty('Debt');
    expect(FINANCIAL_METRICS).toHaveProperty('Equity');
    expect(FINANCIAL_METRICS).toHaveProperty('Interest Expense');
  });

  it('each metric has monthly data arrays', () => {
    Object.values(FINANCIAL_METRICS).forEach((metric) => {
      expect(Array.isArray(metric)).toBe(true);
      expect(metric.length).toBeGreaterThan(0);
    });
  });

  it('exports METRIC_UNITS', () => {
    expect(METRIC_UNITS).toBeDefined();
    expect(typeof METRIC_UNITS).toBe('object');
  });

  it('formatMetricValue formats numbers', () => {
    expect(typeof formatMetricValue).toBe('function');
    const result = formatMetricValue(1000);
    expect(typeof result).toBe('string');
  });
});
