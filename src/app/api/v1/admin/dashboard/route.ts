// ==============================================================================
// SAMASTHA LIVE (1926-2026) CENTENARY PARTICIPATION PLATFORM
// ROUTE: GET /api/v1/admin/dashboard
// ==============================================================================

import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/server/auth/session';
import { isAdmin } from '@/server/permissions/rbac';
import { getAdminDashboardSummary } from '@/server/services/activityService';
import { successResponse, errorResponse, ErrorCodes } from '@/server/utils/response';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return errorResponse(ErrorCodes.UNAUTHORIZED, 'Authentication required', 401);
    }
    const authorized = await isAdmin(user.id);
    if (!authorized) {
      return errorResponse(ErrorCodes.FORBIDDEN, 'Insufficient permissions to view dashboard', 403);
    }

    const summary = await getAdminDashboardSummary();
    return successResponse(summary);
  } catch (err: any) {
    return errorResponse(ErrorCodes.INTERNAL_SERVER_ERROR, err.message, 500);
  }
}
