// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROLE-BASED ACCESS CONTROL: src/server/permissions/rbac.ts
// Description: Multi-role resolution, permission verification, and guard helpers.
// ==============================================================================

import { getAdminClient } from '@/lib/supabase/admin';
import type { UserRole } from '@/types/database';

export async function getUserRoles(userId: string): Promise<UserRole[]> {
  const admin = getAdminClient();
  const { data, error } = await admin
    .from('user_roles')
    .select('role')
    .eq('user_id', userId);

  if (error || !data) {
    return ['participant'];
  }

  return data.map((r) => r.role as UserRole);
}

export async function hasAnyRole(userId: string, allowedRoles: UserRole[]): Promise<boolean> {
  const roles = await getUserRoles(userId);
  // super_admin always satisfies any administrative permission
  if (roles.includes('super_admin')) return true;
  return allowedRoles.some((role) => roles.includes(role));
}

export async function isSuperAdmin(userId: string): Promise<boolean> {
  return hasAnyRole(userId, ['super_admin']);
}

export async function isAdmin(userId: string): Promise<boolean> {
  return hasAnyRole(userId, ['super_admin', 'admin']);
}

export async function isEventManager(userId: string): Promise<boolean> {
  return hasAnyRole(userId, ['super_admin', 'admin', 'event_manager']);
}

export async function isVolunteerManager(userId: string): Promise<boolean> {
  return hasAnyRole(userId, ['super_admin', 'admin', 'volunteer_manager']);
}

export async function isContentManager(userId: string): Promise<boolean> {
  return hasAnyRole(userId, ['super_admin', 'admin', 'content_manager']);
}
