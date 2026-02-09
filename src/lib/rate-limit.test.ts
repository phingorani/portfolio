import { describe, it, expect, vi } from 'vitest';
import { checkRateLimit, cleanupRateLimitCache } from '../app/lib/rate-limit';

describe('rate-limit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    cleanupRateLimitCache();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('checkRateLimit', () => {
    it('should allow request when IP is new', () => {
      const ip = '192.168.1.1';
      const result = checkRateLimit(ip);
      
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(9);
    });

    it('should decrement remaining requests with each call', () => {
      const ip = '192.168.1.2';
      
      for (let i = 0; i < 10; i++) {
        const result = checkRateLimit(ip);
        expect(result.allowed).toBe(true);
        expect(result.remaining).toBe(9 - i);
      }
    });

    it('should deny request when rate limit exceeded', () => {
      const ip = '192.168.1.3';
      
      for (let i = 0; i < 10; i++) {
        checkRateLimit(ip);
      }
      
      const result = checkRateLimit(ip);
      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
    });

    it('should reset rate limit after window expires', () => {
      const ip = '192.168.1.4';
      
      for (let i = 0; i < 10; i++) {
        checkRateLimit(ip);
      }
      
      expect(checkRateLimit(ip).allowed).toBe(false);
      
      vi.mocked(setTimeout).mockClear();
      vi.advanceTimersByTime(60000);
      
      const result = checkRateLimit(ip);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(9);
    });

    it('should track different IPs separately', () => {
      const ip1 = '192.168.1.5';
      const ip2 = '192.168.1.6';
      
      for (let i = 0; i < 10; i++) {
        checkRateLimit(ip1);
      }
      
      const result1 = checkRateLimit(ip1);
      const result2 = checkRateLimit(ip2);
      
      expect(result1.allowed).toBe(false);
      expect(result2.allowed).toBe(true);
    });
  });

  describe('cleanupRateLimitCache', () => {
    it('should remove expired entries', () => {
      const ip = '192.168.1.7';
      checkRateLimit(ip);
      
      vi.advanceTimersByTime(60000);
      cleanupRateLimitCache();
      
      const result = checkRateLimit(ip);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(9);
    });
  });
});
