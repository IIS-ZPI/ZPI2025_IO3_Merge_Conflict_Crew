import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { computeAnalytics, generateJSON, generateCSV } from './export';

describe('export utility', function () {
  beforeEach(function () {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-01T12:00:00Z'));
  });

  afterEach(function () {
    vi.useRealTimers();
  });

  const mockRates = [
    { effectiveDate: '2026-05-25', mid: 4.0 },
    { effectiveDate: '2026-05-26', mid: 4.2 },
    { effectiveDate: '2026-05-27', mid: 4.1 },
    { effectiveDate: '2026-05-28', mid: 4.1 },
    { effectiveDate: '2026-05-29', mid: 4.5 },
  ];

  describe('computeAnalytics', function () {
    it('should compute full session and statistical analytics', function () {
      const analytics = computeAnalytics(mockRates);
      expect(analytics.sessions).toEqual({ growth: 2, decline: 1, noChange: 1 });
      expect(analytics.statistics.median).toBe(4.1);
      expect(analytics.statistics.mode).toBe(4.1);
      expect(analytics.statistics.standardDeviation).toBeCloseTo(0.1924, 3);
    });

    it('should handle empty lists gracefully', function () {
      const analytics = computeAnalytics([]);
      expect(analytics.sessions).toEqual({ growth: 0, decline: 0, noChange: 0 });
      expect(analytics.statistics).toEqual({
        median: null,
        mode: null,
        standardDeviation: null,
        coefficientOfVariation: null,
      });
    });
  });

  describe('generateJSON', function () {
    it('should generate valid JSON containing only dataset', function () {
      const options = { baseCurrency: 'EUR', quoteCurrency: 'USD', timeframe: '1W', type: 'dataset' };
      const jsonStr = generateJSON(mockRates, options);
      const parsed = JSON.parse(jsonStr);

      expect(parsed.metadata.baseCurrency).toBe('EUR');
      expect(parsed.metadata.exportedAt).toBe('2026-06-01T12:00:00.000Z');
      expect(parsed.dataset).toHaveLength(5);
      expect(parsed.analytics).toBeUndefined();
    });

    it('should generate valid JSON containing only analytics', function () {
      const options = { baseCurrency: 'EUR', quoteCurrency: 'USD', timeframe: '1W', type: 'analytics' };
      const jsonStr = generateJSON(mockRates, options);
      const parsed = JSON.parse(jsonStr);

      expect(parsed.metadata.baseCurrency).toBe('EUR');
      expect(parsed.dataset).toBeUndefined();
      expect(parsed.analytics).toBeDefined();
      expect(parsed.analytics.sessions.growth).toBe(2);
    });

    it('should generate valid JSON containing both dataset and analytics', function () {
      const options = { baseCurrency: 'EUR', quoteCurrency: 'USD', timeframe: '1W', type: 'both' };
      const jsonStr = generateJSON(mockRates, options);
      const parsed = JSON.parse(jsonStr);

      expect(parsed.dataset).toBeDefined();
      expect(parsed.analytics).toBeDefined();
    });
  });

  describe('generateCSV', function () {
    it('should generate CSV for dataset only', function () {
      const options = { baseCurrency: 'EUR', quoteCurrency: 'USD', timeframe: '1W', type: 'dataset' };
      const csvStr = generateCSV(mockRates, options);
      expect(csvStr).toContain('Date,Rate');
      expect(csvStr).toContain('2026-05-25,4.0000');
      expect(csvStr).toContain('2026-05-29,4.5000');
    });

    it('should generate CSV for analytics only', function () {
      const options = { baseCurrency: 'EUR', quoteCurrency: 'USD', timeframe: '1W', type: 'analytics' };
      const csvStr = generateCSV(mockRates, options);
      expect(csvStr).toContain('Metric,Value');
      expect(csvStr).toContain('Growth Sessions,2');
      expect(csvStr).toContain('Decline Sessions,1');
      expect(csvStr).toContain('Median,4.1000');
      expect(csvStr).toContain('Mode,4.1');
    });

    it('should generate CSV containing both metadata, analytics and dataset', function () {
      const options = { baseCurrency: 'EUR', quoteCurrency: 'USD', timeframe: '1W', type: 'both' };
      const csvStr = generateCSV(mockRates, options);
      expect(csvStr).toContain('# METADATA');
      expect(csvStr).toContain('# ANALYTICS');
      expect(csvStr).toContain('# DATASET');
    });
  });
});
