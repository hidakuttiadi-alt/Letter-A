// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: GET /api/v1/admin/audit-logs
// ==============================================================================

import { NextRequest } from 'next/server';
import { getAdminClient } from '@/lib/supabase/admin';
import { getCurrentUser } from '@/server/auth/session';
import { isAdmin } from '@/server/permissions/rbac';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';
import type { AuditLogDto } from '@/types/api';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return errorResponse(ErrorCodes.UNAUTHORIZED, 'Authentication required', 401);
    }
    const authorized = await isAdmin(user.id);
    if (!authorized) {
      return errorResponse(ErrorCodes.FORBIDDEN, 'Insufficient permissions to view audit logs', 403);
    }

    const { searchParams } = new URL(req.url);
    const page = searchParams.has('page') ? parseInt(searchParams.get('page')!, 10) : 1;
    const limit = searchParams.has('limit') ? parseInt(searchParams.get('limit')!, 10) : 25;
    const offset = (page - 1) * limit;

    const admin = getAdminClient();
    const { data, count, error } = await admin
      .from('audit_logs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    const logs: AuditLogDto[] = (data || []).map((row: any) => ({
      id: row.id,
      actorId: row.actor_id,
      actorRole: row.actor_role,
      action: row.action,
      resourceType: row.resource_type,
      resourceId: row.resource_id,
      ipAddress: row.ip_address,
      userAgent: row.user_agent,
      metadata: row.metadata,
      createdAt: row.created_at,
    }));

    const total = count || 0;
    return successResponse(logs, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
