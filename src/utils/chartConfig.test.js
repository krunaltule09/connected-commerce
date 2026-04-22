import { createChartDataset, createChartOptions } from './chartConfig';

describe('createChartDataset', () => {
  it('returns dataset with correct data', () => {
    const data = [10, 20, 30];
    const dataset = createChartDataset(data);
    expect(dataset.data).toEqual([10, 20, 30]);
    expect(dataset.label).toBe('YoY Trend');
    expect(dataset.backgroundColor).toBe('#B4FF00');
  });

  it('has bar chart configuration', () => {
    const dataset = createChartDataset([]);
    expect(dataset.borderRadius).toBe(10);
    expect(dataset.barThickness).toBe(9);
    expect(dataset.borderSkipped).toBe('bottom');
  });

  it('has hover effects', () => {
    const dataset = createChartDataset([]);
    expect(dataset.hoverBackgroundColor).toBe('#FFCC00');
    expect(dataset.hoverBorderColor).toBe('#FFCC00');
  });
});

describe('createChartOptions', () => {
  it('returns options object with plugins and scales', () => {
    const formatValue = (v) => `$${v}`;
    const options = createChartOptions('Revenue', formatValue);

    expect(options.responsive).toBe(true);
    expect(options.plugins).toBeDefined();
    expect(options.scales).toBeDefined();
    expect(options.scales.x).toBeDefined();
    expect(options.scales.y).toBeDefined();
  });

  it('has animation config', () => {
    const options = createChartOptions('Test', jest.fn());
    expect(options.animation.duration).toBe(2000);
    expect(options.animation.easing).toBe('easeOutQuart');
  });

  it('uses formatValue in tooltip callback', () => {
    const formatValue = jest.fn((v) => `$${v}M`);
    const options = createChartOptions('Revenue', formatValue);
    const result = options.plugins.tooltip.callbacks.label({ parsed: { y: 50 } });
    expect(formatValue).toHaveBeenCalledWith(50);
    expect(result).toBe('$50M');
  });

  it('uses formatValue in y-axis tick callback', () => {
    const formatValue = jest.fn((v) => `$${v}`);
    const options = createChartOptions('Revenue', formatValue);
    const result = options.scales.y.ticks.callback(100);
    expect(result).toBe('$100');
  });

  it('has tooltip title callback', () => {
    const options = createChartOptions('Test', jest.fn());
    const title = options.plugins.tooltip.callbacks.title([{ label: 'Q1' }]);
    expect(title).toBe('Q1');
  });
});
