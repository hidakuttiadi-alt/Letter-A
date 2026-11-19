// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// UNIT TEST: tests/backend/unit/rbac.test.ts
// ==============================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as rbac from '@/server/permissions/rbac';
import * as adminModule from '@/lib/supabase/admin';

describe('RBAC Permission Hierarchy Tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  function mockRoles(roles: string[]) {
    const mockAdmin = {
      from: () => ({
        select: () => ({
          eq: () => Promise.resolve({
            data: roles.map((r) => ({ role: r })),
            error: null,
          }),
        }),
      }),
    };
    vi.spyOn(adminModule, 'getAdminClient').mockReturnValue(mockAdmin as any);
  }

  it('identifies super_admin satisfying all roles', async () => {
    mockRoles(['super_admin']);

    expect(await rbac.isSuperAdmin('user-1')).toBe(true);
    expect(await rbac.isAdmin('user-1')).toBe(true);
    expect(await rbac.isEventManager('user-1')).toBe(true);
    expect(await rbac.isVolunteerManager('user-1')).toBe(true);
    expect(await rbac.isContentManager('user-1')).toBe(true);
  });

  it('restricts event_manager to event management only', async () => {
    mockRoles(['event_manager']);

    expect(await rbac.isEventManager('user-2')).toBe(true);
    expect(await rbac.isSuperAdmin('user-2')).toBe(false);
    expect(await rbac.isAdmin('user-2')).toBe(false);
    expect(await rbac.isVolunteerManager('user-2')).toBe(false);
    expect(await rbac.isContentManager('user-2')).toBe(false);
  });

  it('restricts participant from elevated administrative functions', async () => {
    mockRoles(['participant']);

    expect(await rbac.isSuperAdmin('user-3')).toBe(false);
    expect(await rbac.isAdmin('user-3')).toBe(false);
    expect(await rbac.isEventManager('user-3')).toBe(false);
    expect(await rbac.isVolunteerManager('user-3')).toBe(false);
    expect(await rbac.isContentManager('user-3')).toBe(false);
  });
});
