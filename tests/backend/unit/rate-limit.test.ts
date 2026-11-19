// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// UNIT TEST: tests/backend/unit/rate-limit.test.ts
// ==============================================================================

import { describe, it, expect } from 'vitest';
import { checkRateLimit, getClientIp } from '@/server/utils/rate-limit';

describe('Rate Limiter Unit Tests', () => {
  it('permits requests within configured threshold', () => {
    const key = `test-ip-${Date.now()}`;
    const limit = 5;
    const windowMs = 5000;

    for (let i = 0; i < limit; i++) {
      const res = checkRateLimit(key, limit, windowMs);
      expect(res.success).toBe(true);
      expect(res.remaining).toBe(limit - (i + 1));
    }
  });

  it('rejects requests once limit is reached', () => {
    const key = `test-overflow-${Date.now()}`;
    const limit = 3;
    const windowMs = 5000;

    // First 3 pass
    for (let i = 0; i < 3; i++) {
      expect(checkRateLimit(key, limit, windowMs).success).toBe(true);
    }

    // 4th request must fail
    const blocked = checkRateLimit(key, limit, windowMs);
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetMs).toBeGreaterThan(0);
  });

  it('extracts client IP from x-forwarded-for header', () => {
    const req = new Request('http://localhost/api/v1/registrations', {
      headers: {
        'x-forwarded-for': '203.0.113.195, 70.41.3.18',
      },
    });
    expect(getClientIp(req)).toBe('203.0.113.195');
  });

  it('falls back to 127.0.0.1 when headers missing', () => {
    const req = new Request('http://localhost/api/v1/registrations');
    expect(getClientIp(req)).toBe('127.0.0.1');
  });
});
