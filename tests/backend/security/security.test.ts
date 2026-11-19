// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// SECURITY TESTS: tests/backend/security/security.test.ts
// ==============================================================================

import { describe, it, expect, vi } from 'vitest';
import { recordAuditLog } from '@/server/utils/audit';
import * as adminModule from '@/lib/supabase/admin';
import { RealtimeChannels } from '@/server/realtime/subscriptions';

describe('Security & Privacy Enforcement Tests', () => {
  it('redacts passwords, tokens, and secrets from audit log metadata', async () => {
    let capturedPayload: any = null;

    const mockAdmin = {
      from: () => ({
        insert: (payload: any) => {
          capturedPayload = payload;
          return Promise.resolve({ error: null });
        },
      }),
    };

    vi.spyOn(adminModule, 'getAdminClient').mockReturnValue(mockAdmin as any);

    await recordAuditLog({
      actorId: 'admin-uuid',
      action: 'UPDATE_CONFIG',
      resourceType: 'system',
      metadata: {
        safeField: 'normal value',
        password: 'my-super-secret-password',
        api_token: 'secret-token-xyz',
        nested: {
          token: 'nested-jwt-token',
          regularKey: 'hello',
        },
      },
    });

    expect(capturedPayload).not.toBeNull();
    expect(capturedPayload.metadata.safeField).toBe('normal value');
    expect(capturedPayload.metadata.password).toBe('[REDACTED]');
    expect(capturedPayload.metadata.api_token).toBe('[REDACTED]');
    expect(capturedPayload.metadata.nested.token).toBe('[REDACTED]');
    expect(capturedPayload.metadata.nested.regularKey).toBe('hello');
  });

  it('guarantees public Realtime channels do not publish private tables', () => {
    const publicChannels = [
      RealtimeChannels.PUBLIC_EVENTS,
      RealtimeChannels.PUBLIC_ANNOUNCEMENTS,
      RealtimeChannels.PUBLIC_ACTIVITY_METRICS,
    ];

    // Verify none of the public channels contain references to PII tables
    publicChannels.forEach((channel) => {
      expect(channel).not.toContain('registrations');
      expect(channel).not.toContain('donations');
      expect(channel).not.toContain('volunteer-applications');
    });

    // Verify admin channels have dedicated admin: prefix
    expect(RealtimeChannels.ADMIN_REGISTRATIONS('test')).toMatch(/^admin:/);
    expect(RealtimeChannels.ADMIN_VOLUNTEERS).toMatch(/^admin:/);
  });
});
