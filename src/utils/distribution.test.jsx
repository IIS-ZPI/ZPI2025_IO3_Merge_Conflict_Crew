import { describe, it, expect } from 'vitest';
import { calculateDistribution } from './distribution';

describe('distribution utility', function () {
  describe('calculateDistribution', function () {
    it('should return empty array for empty or short dataset', function () {
      expect(calculateDistribution(null)).toEqual([]);
      expect(calculateDistribution([])).toEqual([]);
      expect(calculateDistribution([{ mid: 4.0 }])).toEqual([]);
    });

    it('should handle cases where all changes are identical (min === max)', function () {
      const rates = [
        { mid: 4.0 },
        { mid: 5.0 },
        { mid: 6.0 },
      ];
      const distribution = calculateDistribution(rates);
      expect(distribution).toHaveLength(1);
      expect(distribution[0].count).toBe(2);
      expect(distribution[0].range).toBe('1.0000 to 1.0000');
    });

    it('should divide differences into 14 bins and accurately count occurrences', function () {
      const rates = [
        { mid: 10.0 },
        { mid: 9.0 },
        { mid: 11.0 },
      ];
      const distribution = calculateDistribution(rates);
      expect(distribution).toHaveLength(14);

      const totalCount = distribution.reduce(function (sum, bin) {
        return sum + bin.count;
      }, 0);
      expect(totalCount).toBe(2);
    });
  });
});
