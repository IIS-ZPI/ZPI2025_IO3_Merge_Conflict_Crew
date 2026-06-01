import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getDateRange, getForwardDateRange } from './dates';

describe('dates utility', function () {
  beforeEach(function () {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-01T12:00:00Z'));
  });

  afterEach(function () {
    vi.useRealTimers();
  });

  describe('getDateRange', function () {
    it('should generate correct range for 1W (1 week ago)', function () {
      const range = getDateRange('1W');
      expect(range.endDate).toBe('2026-06-01');
      expect(range.startDate).toBe('2026-05-25');
    });

    it('should generate correct range for 2W (2 weeks ago)', function () {
      const range = getDateRange('2W');
      expect(range.endDate).toBe('2026-06-01');
      expect(range.startDate).toBe('2026-05-18');
    });

    it('should generate correct range for 1M (1 month ago)', function () {
      const range = getDateRange('1M');
      expect(range.endDate).toBe('2026-06-01');
      expect(range.startDate).toBe('2026-05-01');
    });

    it('should generate correct range for 1Q (3 months ago)', function () {
      const range = getDateRange('1Q');
      expect(range.endDate).toBe('2026-06-01');
      expect(range.startDate).toBe('2026-03-01');
    });

    it('should generate correct range for 6M (6 months ago)', function () {
      const range = getDateRange('6M');
      expect(range.endDate).toBe('2026-06-01');
      expect(range.startDate).toBe('2025-12-01');
    });

    it('should generate correct range for 1Y (1 year ago)', function () {
      const range = getDateRange('1Y');
      expect(range.endDate).toBe('2026-06-01');
      expect(range.startDate).toBe('2025-06-01');
    });

    it('should fallback to 1W for unknown timeframe', function () {
      const range = getDateRange('UNKNOWN');
      expect(range.endDate).toBe('2026-06-01');
      expect(range.startDate).toBe('2026-05-25');
    });
  });

  describe('getForwardDateRange', function () {
    it('should calculate forward range for Month without exceeding today', function () {
      const range = getForwardDateRange('2026-04-15', 'Month');
      expect(range.startDate).toBe('2026-04-15');
      expect(range.endDate).toBe('2026-05-15');
    });

    it('should calculate forward range for Quarter without exceeding today', function () {
      const range = getForwardDateRange('2026-02-15', 'Quarter');
      expect(range.startDate).toBe('2026-02-15');
      expect(range.endDate).toBe('2026-05-14');
    });

    it('should cap the forward range to today if the calculated end date exceeds today', function () {
      const range = getForwardDateRange('2026-05-15', 'Month');
      expect(range.startDate).toBe('2026-05-15');
      expect(range.endDate).toBe('2026-06-01');
    });
  });
});
