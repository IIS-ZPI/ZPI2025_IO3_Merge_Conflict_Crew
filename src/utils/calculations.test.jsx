import { describe, it, expect } from 'vitest';
import {
  calculateSessions,
  calculateCrossRates,
  calculateMean,
  calculateMedian,
  calculateMode,
  calculateStandardDeviation,
  calculateCoefficientOfVariation,
} from './calculations';

describe('calculations utility', function () {
  describe('calculateSessions', function () {
    it('should return all zeroes for empty or single element array', function () {
      expect(calculateSessions([])).toEqual({ growth: 0, decline: 0, noChange: 0 });
      expect(calculateSessions([{ mid: 4.5 }])).toEqual({ growth: 0, decline: 0, noChange: 0 });
      expect(calculateSessions(null)).toEqual({ growth: 0, decline: 0, noChange: 0 });
    });

    it('should correctly count upward, downward, and stable sessions', function () {
      const rates = [
        { mid: 4.0 },
        { mid: 4.2 },
        { mid: 4.2 },
        { mid: 4.1 },
        { mid: 4.5 },
      ];
      expect(calculateSessions(rates)).toEqual({ growth: 2, decline: 1, noChange: 1 });
    });
  });

  describe('calculateCrossRates', function () {
    it('should handle missing base or quote data', function () {
      expect(calculateCrossRates(null, null)).toEqual([]);
      expect(calculateCrossRates({ rates: [] }, null)).toEqual([]);
      expect(calculateCrossRates({ rates: [{ effectiveDate: '2026-06-01', mid: 4.0 }] }, null)).toEqual([
        { effectiveDate: '2026-06-01', mid: 4.0 }
      ]);
    });

    it('should calculate synthetic cross rates for matching dates', function () {
      const baseData = {
        rates: [
          { effectiveDate: '2026-06-01', mid: 4.0 },
          { effectiveDate: '2026-06-02', mid: 4.2 },
        ]
      };
      const quoteData = {
        rates: [
          { effectiveDate: '2026-06-01', mid: 2.0 },
          { effectiveDate: '2026-06-02', mid: 2.1 },
        ]
      };
      const expected = [
        { effectiveDate: '2026-06-01', mid: 2.0 },
        { effectiveDate: '2026-06-02', mid: 2.0 },
      ];
      expect(calculateCrossRates(baseData, quoteData)).toEqual(expected);
    });

    it('should skip dates that are not present in both datasets', function () {
      const baseData = {
        rates: [
          { effectiveDate: '2026-06-01', mid: 4.0 },
          { effectiveDate: '2026-06-02', mid: 4.2 },
        ]
      };
      const quoteData = {
        rates: [
          { effectiveDate: '2026-06-01', mid: 2.0 },
        ]
      };
      const expected = [
        { effectiveDate: '2026-06-01', mid: 2.0 },
      ];
      expect(calculateCrossRates(baseData, quoteData)).toEqual(expected);
    });
  });

  describe('calculateMean', function () {
    it('should return 0 for empty or null array', function () {
      expect(calculateMean([])).toBe(0);
      expect(calculateMean(null)).toBe(0);
    });

    it('should calculate the mean correctly', function () {
      expect(calculateMean([10, 20, 30])).toBe(20);
      expect(calculateMean([1.5, 2.5, 3.5, 4.5])).toBe(3);
    });
  });

  describe('calculateMedian', function () {
    it('should return 0 for empty or null array', function () {
      expect(calculateMedian([])).toBe(0);
      expect(calculateMedian(null)).toBe(0);
    });

    it('should calculate median for odd number of elements', function () {
      expect(calculateMedian([5, 1, 9])).toBe(5);
    });

    it('should calculate median for even number of elements', function () {
      expect(calculateMedian([5, 1, 9, 2])).toBe(3.5);
    });
  });

  describe('calculateMode', function () {
    it('should return null for empty or null array', function () {
      expect(calculateMode([])).toBeNull();
      expect(calculateMode(null)).toBeNull();
    });

    it('should return "None" if there are no repeating numbers', function () {
      expect(calculateMode([1, 2, 3, 4])).toBe('None');
    });

    it('should return a single number if there is a single unique mode', function () {
      expect(calculateMode([1.23456, 2.3456, 1.23456])).toBe(1.2346);
    });

    it('should return joined string for up to three modes', function () {
      expect(calculateMode([1.1111, 1.1111, 2.2222, 2.2222, 3.3333])).toBe('1.1111, 2.2222');
      expect(calculateMode([1.1111, 1.1111, 2.2222, 2.2222, 3.3333, 3.3333])).toBe('1.1111, 2.2222, 3.3333');
    });

    it('should return first two modes with ellipsis for more than three modes', function () {
      expect(calculateMode([1.1, 1.1, 2.2, 2.2, 3.3, 3.3, 4.4, 4.4])).toBe('1.1000, 2.2000...');
    });
  });

  describe('calculateStandardDeviation', function () {
    it('should return 0 for arrays with 1 or fewer elements', function () {
      expect(calculateStandardDeviation([])).toBe(0);
      expect(calculateStandardDeviation([10])).toBe(0);
      expect(calculateStandardDeviation(null)).toBe(0);
    });

    it('should calculate sample standard deviation correctly', function () {
      const values = [2, 4, 4, 4, 5, 5, 7, 9];
      expect(calculateStandardDeviation(values)).toBeCloseTo(2.138, 3);
    });
  });

  describe('calculateCoefficientOfVariation', function () {
    it('should return 0 for empty arrays or when mean is 0', function () {
      expect(calculateCoefficientOfVariation([])).toBe(0);
      expect(calculateCoefficientOfVariation([0, 0])).toBe(0);
      expect(calculateCoefficientOfVariation(null)).toBe(0);
    });

    it('should calculate coefficient of variation as percentage correctly', function () {
      expect(calculateCoefficientOfVariation([10, 20, 30])).toBe(50);
    });
  });
});
